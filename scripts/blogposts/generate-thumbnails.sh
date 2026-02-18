#!/usr/bin/env bash
set -euo pipefail

GREEN="\033[32m"
RED="\033[31m"
RESET="\033[0m"
BLUE="\033[34m"
YELLOW="\033[33m"

THUMBNAIL_DIR="$HOME/github/oliverjessner.github.io/assets/images/gen/blog/"
HEADER_PNG="$HOME/Downloads/header.png"
POST_DIR="$HOME/github/oliverjessner.github.io/collections/_posts"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INDEXNOW_SCRIPT="${SCRIPT_DIR}/indexnow.sh"
SITE_URL="${SITE_URL:-https://oliverjessner.at}"

latest_post="$(ls -1t "$POST_DIR" | head -n 1)"
without_first_11="${latest_post:11}"
without_first_11_no_last3="${without_first_11%???}"
name="${without_first_11_no_last3}"
slug_name="${latest_post%???}"
post_url="${SITE_URL}/blog/${slug_name}/"

if [[ ! -e "$HEADER_PNG" ]]; then
  printf "${RED}Missing:${RESET} $HEADER_PNG\n" >&2
  echo "Please download the header.png from canva file and place it in the Downloads folder." >&2
  exit 1
fi

printf "${GREEN}Generating Directory:${RESET} ${THUMBNAIL_DIR}${name}\n"

mkdir -p "${THUMBNAIL_DIR}${name}"

printf "${GREEN}Generating webp Thumbnails${RESET}\n"

cwebp "$HEADER_PNG" -resize 500 0 -o "${THUMBNAIL_DIR}${name}/header_thumbnail.webp" >/dev/null 2>&1
cwebp "$HEADER_PNG" -o "${THUMBNAIL_DIR}${name}/header.webp" >/dev/null 2>&1

printf "${GREEN}Removing temporary files:${RESET} ${HEADER_PNG} \n"

rm "$HEADER_PNG"

if [[ " $* " == *" --push "* ]]; then
  git add -A && git commit -m 'neuer blog post' && git push

  if [[ "${INDEXNOW_DISABLE:-0}" == "1" ]]; then
    printf "${BLUE}IndexNow disabled:${RESET} INDEXNOW_DISABLE=1\n"
  elif [[ -f "${INDEXNOW_SCRIPT}" ]]; then
    if bash "${INDEXNOW_SCRIPT}" submit "${post_url}"; then
      printf "${GREEN}IndexNow ping sent:${RESET} %s\n" "${post_url}"
    else
      printf "${YELLOW}IndexNow skipped:${RESET} configure key with 'bash scripts/blogposts/indexnow.sh generate-key'\n"
    fi
  else
    printf "${YELLOW}IndexNow script missing:${RESET} %s\n" "${INDEXNOW_SCRIPT}"
  fi

  printf "${BLUE}Push to Github open Chrome Tab in: ${RESET} 40sek\n"
  sleep 40
  open -a "Google Chrome" "${post_url}"
else
  printf "${BLUE}Open Chrome Tab in:${RESET} 5 sek\n"

  sleep 5
  open -a "Google Chrome" "http://localhost:4000/blog/${slug_name}/"

  printf "${BLUE}Kein --push gesetzt: skip.${RESET}"
fi
