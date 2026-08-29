#!/bin/zsh
set -euo pipefail

GREEN="\033[32m"
RESET="\033[0m"
POST_DIR="$HOME/github/oliverjessner.github.io/collections/_posts"
post_count="$(find "$POST_DIR" -maxdepth 1 -type f -name "*.md" | wc -l | tr -d ' ')"
today="$(date +%Y-%m-%d)"
timestamp="$(date '+%Y-%m-%d %H:%M:%S %z')"

mkdir -p "$POST_DIR"

slugify_args() {
  printf '%s' "$*" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//'
}

slug=""
if [[ $# -gt 0 ]]; then
  slug="$(slugify_args "$@")"
fi

if [[ -n "$slug" ]]; then
  base="${today}-${slug}"
else
  base="${today}-z"
fi

filepath="${POST_DIR}/${base}.md"

# prevent overwriting existing files
i=1
while [[ -e "$filepath" ]]; do
  filepath="${POST_DIR}/${base}-${i}.md"
  ((i++))
done

cat > "$filepath" <<EOF
---
layout: post
title: ''
date: $timestamp
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - 
description: ''
thumbnail: '/assets/images/gen/blog/xxx/header_thumbnail.webp'
image: '/assets/images/gen/blog/xxx/header.webp'
---

EOF

printf "${GREEN}Created:${RESET} $filepath \n"
printf "${GREEN}Total posts:${RESET} $post_count \n"

open -a "Visual Studio Code" "$filepath"
sleep 1

rssLink=$(no-bullshit-rss articles last 30 --choose --url --title)
prompt_encoded="$(
  python3 -c 'import sys; from urllib.parse import quote; print(quote(sys.stdin.read(), safe=""))' < prompts/prompt.md
)"
rssLink_encoded="$(
  python3 -c 'import sys; from urllib.parse import quote; print(quote(sys.stdin.read(), safe=""))' <<< "$rssLink"
)"

open -a "Google Chrome" "https://chatgpt.com/?prompt=${prompt_encoded}${rssLink_encoded}"

pbcopy < prompts/thumbnail.md

echo "Copied thumbnail prompt to clipboard. You can paste it into ChatGPT to generate a thumbnail image."

sleep 3

print -z "npm run blog:publish"