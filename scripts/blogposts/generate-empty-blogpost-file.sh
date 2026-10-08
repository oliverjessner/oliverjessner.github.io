#!/bin/zsh
set -euo pipefail

GREEN="\033[32m"
RESET="\033[0m"
SCRIPT_DIR="${0:A:h}"
REPO_DIR="${SCRIPT_DIR:h:h}"
POST_DIR="${REPO_DIR}/collections/_posts"
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
news: false
pinned: false
ads: true
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
post_count="$(find "$POST_DIR" -maxdepth 1 -type f -name "*.md" | wc -l | tr -d ' ')"
printf "${GREEN}Total posts:${RESET} $post_count \n"

open -a "Visual Studio Code" "$filepath"
sleep 1

# The bundled CLI imports a backend connection before discovering the app DB.
# Set the existing database explicitly so it does not try to open one in app.asar.
rss_database="${DB_PATH:-$HOME/Library/Application Support/NO-BULLSHIT-RSS/data-v2.db}"
rssLink=""
if ! command -v no-bullshit-rss > /dev/null 2>&1; then
  printf 'Warning: no-bullshit-rss is not installed. Continuing without an RSS article.\n' >&2
elif [[ ! -f "$rss_database" ]]; then
  printf 'Warning: RSS database not found at %s. Start NO BULLSHIT RSS or set DB_PATH. Continuing without an RSS article.\n' "$rss_database" >&2
elif ! rssLink="$(DB_PATH="$rss_database" no-bullshit-rss articles last 100 --choose --url --title)"; then
  rssLink=""
  printf 'Warning: RSS selection failed. Continuing without an RSS article.\n' >&2
fi
prompt_encoded="$(
  python3 -c 'import sys; from urllib.parse import quote; print(quote(sys.stdin.read(), safe=""))' < "${REPO_DIR}/prompts/prompt.md"
)"
rssLink_encoded="$(
  python3 -c 'import sys; from urllib.parse import quote; print(quote(sys.stdin.read(), safe=""))' <<< "$rssLink"
)"

open -a "Google Chrome" "https://chatgpt.com/?prompt=${prompt_encoded}${rssLink_encoded}"

pbcopy < "${REPO_DIR}/prompts/article-thumbnail.md"

echo "Copied thumbnail prompt to clipboard. You can paste it into ChatGPT to generate a thumbnail image."

sleep 3
