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

changed_posts=()
tmp_changed_posts="$(mktemp)"
trap 'rm -f "${tmp_changed_posts}"' EXIT

git -C "${REPO_ROOT}" diff --name-only -z -- collections/_posts > "${tmp_changed_posts}"

while IFS= read -r -d '' path; do
  changed_posts+=("${path}")
done < "${tmp_changed_posts}"

if [[ ${#changed_posts[@]} -eq 0 ]]; then
  printf "${BLUE}No changed blog posts found in collections/_posts.${RESET}\n"
  exit 0
fi

printf "${BLUE}Submitting %s changed blog post(s) to IndexNow...${RESET}\n" "${#changed_posts[@]}"

submitted=0
total=${#changed_posts[@]}

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
    sleep 2
  fi
done

printf "${GREEN}Done.${RESET} Submitted %s URL(s).\n" "${submitted}"
