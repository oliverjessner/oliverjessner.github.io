#!/usr/bin/env bash
set -euo pipefail

GREEN="\033[32m"
RED="\033[31m"
BLUE="\033[34m"
RESET="\033[0m"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
CONFIG_FILE="${REPO_ROOT}/_config.yml"
INDEXNOW_ENDPOINT="${INDEXNOW_ENDPOINT:-https://api.indexnow.org/indexnow}"

usage() {
  cat <<'EOF'
Usage:
  scripts/blogposts/indexnow.sh generate-key
  scripts/blogposts/indexnow.sh submit <url> [url2 ...]

Commands:
  generate-key   Generate an IndexNow key and create <key>.txt in repo root.
  submit         Submit one or more URLs to IndexNow using the configured key.

Environment variables:
  SITE_URL       Override site URL (defaults to url in _config.yml).
  INDEXNOW_KEY   Override key value (otherwise auto-detected from root key file).
  INDEXNOW_ENDPOINT  Override submission endpoint.
EOF
}

infer_site_url() {
  if [[ -n "${SITE_URL:-}" ]]; then
    printf "%s" "${SITE_URL%/}"
    return 0
  fi

  if [[ -f "${CONFIG_FILE}" ]]; then
    local cfg_url
    cfg_url="$(sed -nE "s/^url:[[:space:]]*['\"]?(https?:\\/\\/[^'\"[:space:]]+)['\"]?[[:space:]]*$/\\1/p" "${CONFIG_FILE}" | head -n 1)"
    if [[ -n "${cfg_url}" ]]; then
      printf "%s" "${cfg_url%/}"
      return 0
    fi
  fi

  printf "${RED}Could not infer SITE_URL from _config.yml.${RESET}\n" >&2
  printf "Set SITE_URL explicitly, e.g. SITE_URL=https://oliverjessner.at\n" >&2
  return 1
}

extract_host() {
  local site_url="$1"
  local host="${site_url#http://}"
  host="${host#https://}"
  host="${host%%/*}"
  printf "%s" "${host}"
}

find_key_file() {
  local candidate content basename_key
  shopt -s nullglob
  for candidate in "${REPO_ROOT}"/*.txt; do
    basename_key="$(basename "${candidate}" .txt)"
    content="$(tr -d '\r\n[:space:]' < "${candidate}")"
    if [[ "${basename_key}" == "${content}" && "${basename_key}" =~ ^[A-Za-z0-9-]{8,128}$ ]]; then
      printf "%s" "${candidate}"
      return 0
    fi
  done
  shopt -u nullglob
  return 1
}

detect_key() {
  if [[ -n "${INDEXNOW_KEY:-}" ]]; then
    printf "%s" "${INDEXNOW_KEY}"
    return 0
  fi

  local key_file
  if key_file="$(find_key_file)"; then
    basename "${key_file}" .txt
    return 0
  fi

  printf "${RED}No IndexNow key found.${RESET}\n" >&2
  printf "Run: bash scripts/blogposts/indexnow.sh generate-key\n" >&2
  return 1
}

generate_key() {
  local key key_file

  if command -v uuidgen >/dev/null 2>&1; then
    key="$(uuidgen | tr '[:upper:]' '[:lower:]')"
  else
    key="$(openssl rand -hex 16)"
  fi

  key_file="${REPO_ROOT}/${key}.txt"
  printf "%s\n" "${key}" > "${key_file}"

  printf "${GREEN}IndexNow key generated:${RESET} %s\n" "${key}"
  printf "${GREEN}Key file created:${RESET} %s\n" "${key_file}"
  printf "${BLUE}Next step:${RESET} commit + deploy this file so it's reachable at /%s.txt\n" "${key}"
}

json_escape() {
  local s="$1"
  s="${s//\\/\\\\}"
  s="${s//\"/\\\"}"
  s="${s//$'\n'/\\n}"
  s="${s//$'\r'/\\r}"
  printf "%s" "${s}"
}

submit_urls() {
  if [[ $# -lt 1 ]]; then
    printf "${RED}No URL provided.${RESET}\n" >&2
    usage
    return 1
  fi

  local site_url host key key_location payload urls_json=""
  site_url="$(infer_site_url)"
  host="$(extract_host "${site_url}")"
  key="$(detect_key)"
  key_location="${site_url}/${key}.txt"

  local url escaped_url i=0
  for url in "$@"; do
    if [[ "${url}" != "${site_url}"* ]]; then
      printf "${RED}URL host mismatch:${RESET} %s\n" "${url}" >&2
      printf "All URLs must start with %s\n" "${site_url}" >&2
      return 1
    fi
    escaped_url="$(json_escape "${url}")"
    if [[ ${i} -gt 0 ]]; then
      urls_json+=","
    fi
    urls_json+="\"${escaped_url}\""
    i=$((i + 1))
  done

  payload="$(cat <<EOF
{"host":"${host}","key":"${key}","keyLocation":"${key_location}","urlList":[${urls_json}]}
EOF
)"

  local status
  status="$(curl -sS -o /dev/null -w "%{http_code}" \
    -H "Content-Type: application/json; charset=utf-8" \
    -X POST "${INDEXNOW_ENDPOINT}" \
    --data "${payload}")"

  if [[ "${status}" == "200" || "${status}" == "202" ]]; then
    printf "${GREEN}IndexNow submitted:${RESET} %s URL(s), HTTP %s\n" "${i}" "${status}"
    return 0
  fi

  printf "${RED}IndexNow submission failed.${RESET} HTTP %s\n" "${status}" >&2
  printf "Key file should be accessible at: %s\n" "${key_location}" >&2
  return 1
}

main() {
  local cmd="${1:-}"
  case "${cmd}" in
    generate-key)
      generate_key
      ;;
    submit)
      shift
      submit_urls "$@"
      ;;
    ""|-h|--help|help)
      usage
      ;;
    *)
      printf "${RED}Unknown command:${RESET} %s\n" "${cmd}" >&2
      usage
      return 1
      ;;
  esac
}

main "$@"
