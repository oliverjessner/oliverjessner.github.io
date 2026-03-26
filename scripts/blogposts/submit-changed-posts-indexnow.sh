#!/usr/bin/env bash
set -euo pipefail

BLUE="\033[34m"
GREEN="\033[32m"
RED="\033[31m"
RESET="\033[0m"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
SITE_URL="${SITE_URL:-https://oliverjessner.at}"
BLOG_BASE_URL="${SITE_URL%/}/blog"
STATE_FILE="${REPO_ROOT}/.git/indexnow-last-submitted-commit"
SLEEP_SECONDS="${SLEEP_SECONDS:-2}"

usage() {
  cat <<'EOF'
Usage:
  bash scripts/blogposts/submit-changed-posts-indexnow.sh
  bash scripts/blogposts/submit-changed-posts-indexnow.sh --range <git-range>
  bash scripts/blogposts/submit-changed-posts-indexnow.sh --working-tree

Default behavior:
  Submit changed blog posts since the last successful run.
  The script stores the last submitted commit in .git/indexnow-last-submitted-commit.

Options:
  --range <git-range>  Submit posts changed in an explicit git range, e.g. HEAD~3..HEAD
  --working-tree       Submit posts currently changed in the local worktree
  -h, --help           Show this help

Environment variables:
  SITE_URL       Override site URL, defaults to https://oliverjessner.at
  SLEEP_SECONDS  Delay between submissions, defaults to 2
EOF
}

resolve_commit_range() {
  local current_head last_submitted

  current_head="$(git -C "${REPO_ROOT}" rev-parse HEAD)"

  if [[ -f "${STATE_FILE}" ]]; then
    last_submitted="$(tr -d '\r\n[:space:]' < "${STATE_FILE}")"
    if [[ -n "${last_submitted}" ]] && git -C "${REPO_ROOT}" rev-parse --verify "${last_submitted}^{commit}" >/dev/null 2>&1; then
      if [[ "${last_submitted}" == "${current_head}" ]]; then
        printf "%s" ""
        return 0
      fi
      printf "%s..%s" "${last_submitted}" "${current_head}"
      return 0
    fi
  fi

  if git -C "${REPO_ROOT}" rev-parse --verify HEAD~1 >/dev/null 2>&1; then
    printf "%s" "HEAD~1..HEAD"
    return 0
  fi

  printf "%s" "HEAD"
}

collect_changed_posts_from_range() {
  local range="$1"

  if [[ -z "${range}" ]]; then
    return 0
  fi

  if [[ "${range}" == "HEAD" ]]; then
    git -C "${REPO_ROOT}" show --name-only --format='' -z HEAD -- collections/_posts
    return 0
  fi

  git -C "${REPO_ROOT}" diff --name-only -z --diff-filter=AM "${range}" -- collections/_posts
}

collect_changed_posts_from_worktree() {
  git -C "${REPO_ROOT}" diff --name-only -z -- collections/_posts
}

main() {
  local mode="state"
  local explicit_range=""

  while [[ $# -gt 0 ]]; do
    case "$1" in
      --range)
        explicit_range="${2:-}"
        if [[ -z "${explicit_range}" ]]; then
          printf "${RED}Missing value for --range.${RESET}\n" >&2
          exit 1
        fi
        mode="range"
        shift 2
        ;;
      --working-tree)
        mode="worktree"
        shift
        ;;
      -h|--help|help)
        usage
        exit 0
        ;;
      *)
        printf "${RED}Unknown argument:${RESET} %s\n" "$1" >&2
        usage
        exit 1
        ;;
    esac
  done

  local tmp_changed_posts
  tmp_changed_posts="$(mktemp)"
  trap 'rm -f "${tmp_changed_posts}"' EXIT

  local range=""
  case "${mode}" in
    state)
      range="$(resolve_commit_range)"
      collect_changed_posts_from_range "${range}" > "${tmp_changed_posts}"
      ;;
    range)
      if ! git -C "${REPO_ROOT}" rev-parse --verify "${explicit_range##*..}^{commit}" >/dev/null 2>&1 && [[ "${explicit_range}" != "HEAD" ]]; then
        printf "${RED}Invalid git range:${RESET} %s\n" "${explicit_range}" >&2
        exit 1
      fi
      range="${explicit_range}"
      collect_changed_posts_from_range "${range}" > "${tmp_changed_posts}"
      ;;
    worktree)
      collect_changed_posts_from_worktree > "${tmp_changed_posts}"
      ;;
  esac

  local changed_posts=()
  while IFS= read -r -d '' path; do
    changed_posts+=("${path}")
  done < "${tmp_changed_posts}"

  if [[ ${#changed_posts[@]} -eq 0 ]]; then
    if [[ "${mode}" == "state" ]]; then
      git -C "${REPO_ROOT}" rev-parse HEAD > "${STATE_FILE}"
    fi

    case "${mode}" in
      state)
        printf "${BLUE}No changed blog posts found since last successful submission.${RESET}\n"
        ;;
      range)
        printf "${BLUE}No changed blog posts found in range %s.${RESET}\n" "${range}"
        ;;
      worktree)
        printf "${BLUE}No changed blog posts found in collections/_posts.${RESET}\n"
        ;;
    esac
    exit 0
  fi

  case "${mode}" in
    state)
      printf "${BLUE}Submitting %s changed blog post(s) since last successful run...${RESET}\n" "${#changed_posts[@]}"
      ;;
    range)
      printf "${BLUE}Submitting %s changed blog post(s) from %s...${RESET}\n" "${#changed_posts[@]}" "${range}"
      ;;
    worktree)
      printf "${BLUE}Submitting %s changed blog post(s) from the local worktree...${RESET}\n" "${#changed_posts[@]}"
      ;;
  esac

  local submitted=0
  local total=${#changed_posts[@]}
  local path filename slug url

  for ((i = 0; i < total; i++)); do
    path="${changed_posts[$i]}"
    filename="$(basename "${path}")"
    slug="${filename%.md}"
    slug="${slug#????-??-??-}"

    if [[ -z "${slug}" || "${slug}" == "${filename%.md}" ]]; then
      printf "${RED}Could not derive slug from:${RESET} %s\n" "${path}" >&2
      exit 1
    fi

    url="${BLOG_BASE_URL}/${slug}"

    printf "${GREEN}Submitting:${RESET} %s\n" "${url}"
    (
      cd "${REPO_ROOT}"
      sh "scripts/blogposts/indexnow.sh" submit "${url}"
    )

    submitted=$((submitted + 1))

    if ((i + 1 < total)); then
      sleep "${SLEEP_SECONDS}"
    fi
  done

  if [[ "${mode}" == "state" ]]; then
    git -C "${REPO_ROOT}" rev-parse HEAD > "${STATE_FILE}"
  fi

  printf "${GREEN}Done.${RESET} Submitted %s URL(s).\n" "${submitted}"
}

main "$@"
