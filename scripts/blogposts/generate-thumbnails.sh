#!/usr/bin/env bash
set -euo pipefail

GREEN="\033[32m"
RED="\033[31m"
RESET="\033[0m"
BLUE="\033[34m"

THUMBNAIL_DIR="$HOME/github/oliverjessner.github.io/assets/images/gen/blog/"
HEADER_PNG="$HOME/Downloads/header.png"
POST_DIR="$HOME/github/oliverjessner.github.io/collections/_posts"

latest_post="$(ls -1t "$POST_DIR" | head -n 1)"
without_first_11="${latest_post:11}"
without_first_11_no_last3="${without_first_11%???}"
name="${without_first_11_no_last3}"
slug_name="${latest_post%???}"

if [[ ! -e "$HEADER_PNG" ]]; then
  printf "${RED}Missing:${RESET} $HEADER_PNG\n" >&2
  echo "Please download the header.png from canva file and place it in the Downloads folder." >&2
  exit 1
fi

printf "${GREEN}Generating Directory:${RESET} ${THUMBNAIL_DIR}${name}\n"

mkdir -p "${THUMBNAIL_DIR}${name}"

printf "${GREEN}Generating webp Thumbnails${RESET}\n"

cwebp "$HEADER_PNG" -resize 500 0 -o "${THUMBNAIL_DIR}${name}/header_thumbnail.webp"
cwebp "$HEADER_PNG" -o "${THUMBNAIL_DIR}${name}/header.webp"

printf "${GREEN}Removing temporary files:${RESET} ${HEADER_PNG} \n"

rm "$HEADER_PNG"

printf "${GREEN}Open Chrome Tab${RESET}\n"

open -a "Google Chrome" "http://localhost:4000/blog/${slug_name}/"

if [[ " $* " == *" --push "* ]]; then
  git add -A && git commit -m 'neuer blog post' && git push
else
  printf "${BLUE}Kein --push gesetzt: skip.${RESET}"
fi