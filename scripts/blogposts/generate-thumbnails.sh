#!/usr/bin/env bash
set -euo pipefail

THUMBNAIL_DIR="$HOME/github/oliverjessner.github.io/assets/images/gen/blog/"
HEADER_PNG="$HOME/Downloads/header.png"
POST_DIR="$HOME/github/oliverjessner.github.io/collections/_posts"

latest_post="$(ls -1t "$POST_DIR" | head -n 1)"
without_first_11="${latest_post:11}"
without_first_11_no_last3="${without_first_11%???}"
name="${without_first_11_no_last3}"
slug_name="${latest_post%???}"



if [[ ! -e "$HEADER_PNG" ]]; then
  echo "Missing: $HEADER_PNG" >&2
  echo "Please download the header.png from canva file and place it in the Downloads folder." >&2
  exit 1
fi

echo "Generating Directory: ${THUMBNAIL_DIR}${name}"

mkdir -p "${THUMBNAIL_DIR}${name}"

echo "Generating webp Thumbnails"

cwebp "$HEADER_PNG" -resize 500 0 -o "${THUMBNAIL_DIR}${name}/header_thumbnail.webp"
cwebp "$HEADER_PNG" -o "${THUMBNAIL_DIR}${name}/header.webp"

echo "Removing temporary files"

rm "$HEADER_PNG"

open -a "Google Chrome" "http://localhost:4000/blog/${slug_name}/"

git add -A && git commit -m 'neuer blog post' && git push