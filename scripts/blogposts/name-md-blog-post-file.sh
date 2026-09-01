#!/usr/bin/env bash
set -euo pipefail

GREEN="\033[32m"
RED="\033[31m"
RESET="\033[0m"
BLUE="\033[34m"

POST_DIR="$HOME/github/oliverjessner.github.io/collections/_posts"

shopt -s nullglob
post_files=("$POST_DIR"/*.md)
md_file=""

for candidate in "${post_files[@]}"; do
  if [[ -z "$md_file" || "$candidate" -nt "$md_file" ]]; then
    md_file="$candidate"
  fi
done

if [[ -z "$md_file" || ! -f "$md_file" ]]; then
  printf "${RED}ERROR: No markdown post found in %s.${RESET}\n" "$POST_DIR" >&2
  exit 1
fi

line="$(
  awk '
    /^---[[:space:]]*$/ {
      marker++

      if (marker == 2) {
        exit
      }

      next
    }

    marker == 1 && /^thumbnail:[[:space:]]*/ {
      print
      exit
    }
  ' "$md_file"
)"

if [[ -z "$line" ]]; then
  printf "${RED}ERROR: No thumbnail field found in the YAML front matter of %s.${RESET}\n" "$md_file" >&2
  exit 1
fi

thumbnail_path="${line#thumbnail:}"
thumbnail_path="${thumbnail_path#"${thumbnail_path%%[![:space:]]*}"}"
thumbnail_path="${thumbnail_path%"${thumbnail_path##*[![:space:]]}"}"
thumbnail_path="${thumbnail_path%$'\r'}"

first_character="${thumbnail_path:0:1}"
last_character="${thumbnail_path: -1}"

if [[ ("$first_character" == "'" && "$last_character" == "'") || ("$first_character" == '"' && "$last_character" == '"') ]]; then
  thumbnail_path="${thumbnail_path:1:${#thumbnail_path}-2}"
fi

thumbnail_prefix="/assets/images/gen/blog/"
thumbnail_suffix="/header_thumbnail.webp"

if [[ "$thumbnail_path" != "$thumbnail_prefix"*"$thumbnail_suffix" ]]; then
  printf "${RED}ERROR: Unexpected thumbnail path in %s:${RESET} %s\n" "$md_file" "$thumbnail_path" >&2
  exit 1
fi

slug="${thumbnail_path#"$thumbnail_prefix"}"
slug="${slug%"$thumbnail_suffix"}"

if [[ -z "$slug" ]]; then
  printf "${RED}ERROR: Could not extract a slug from thumbnail path:${RESET} %s\n" "$thumbnail_path" >&2
  exit 1
fi

destination="${POST_DIR}/$(date +%Y-%m-%d)-${slug}.md"

printf "${GREEN}Found slug:${RESET} ${slug} \n"

if [[ "$md_file" == "$destination" ]]; then
  printf "${BLUE}Post already has the correct filename:${RESET} %s\n" "$destination"
elif [[ -e "$destination" ]]; then
  printf "${RED}ERROR: Destination already exists:${RESET} %s\n" "$destination" >&2
  exit 1
else
  mv -- "$md_file" "$destination"
  printf "${BLUE}Renamed post:${RESET} %s\n" "$destination"
fi
