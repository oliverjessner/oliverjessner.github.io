#!/usr/bin/env bash
set -euo pipefail

RED="\033[31m"
GREEN="\033[32m"
RESET="\033[0m"

# Usage:
#   ./extract_thumbnail_slug.sh /path/to/post.md
# Capture:
#   slug="$(./extract_thumbnail_slug.sh /path/to/post.md)"

POST_DIR="$HOME/github/oliverjessner.github.io/collections/_posts"
lastfile="$(ls -1 "$POST_DIR" | sort | tail -n 1)"
md_file="${POST_DIR}/${lastfile}"

if [[ -z "$md_file" ]]; then
  printf "${RED}ERROR: Please provide a markdown file path.${RESET}" >&2
  exit 1
fi

if [[ ! -f "$md_file" ]]; then
  echo "${POST_DIR}/${md_file}"
  printf "${RED}ERROR: File not found: $md_file${RESET}" >&2
  exit 1
fi

# Line 12 contains:
# thumbnail: '/assets/images/gen/blog/<slug>/header_thumbnail.webp'
line="$(sed -n '12p' "$md_file")"

# Optional sanity check
if [[ "$line" != thumbnail:* ]]; then
  echo "ERROR: Line 12 does not start with 'thumbnail:'" >&2
  printf "${RED}Line 12 was:${RESET} $line" >&2
  exit 1
fi

# Remove everything up to character 37 (1-based) -> keep from index 36 (0-based)
# This assumes the prefix length is exactly 36 chars (e.g. "thumbnail: '/assets/images/gen/blog/")
if ((${#line} < 37)); then
  echo "ERROR: Line 12 is shorter than 37 characters, cannot cut." >&2
  printf "${RED}Line 12 was:${RESET} $line" >&2
  exit 1
fi

rest="${line:36}"          # slug + "/header_thumbnail.webp'"
rest="${rest%\'}"          # remove trailing single quote

slug="${rest%/header_thumbnail.webp}"  # remove suffix

printf "${GREEN}Found slug:${RESET} ${slug}"
printf "${GREEN}Open New VSCode Tab${RESET}"

mv -- "${md_file}" "${POST_DIR}/$(date +%Y-%m-%d)-${slug}.md"

open -a "Visual Studio Code" "${POST_DIR}/$(date +%Y-%m-%d)-${slug}.md"