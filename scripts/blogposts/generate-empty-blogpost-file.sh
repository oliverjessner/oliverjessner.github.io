#!/usr/bin/env bash
set -euo pipefail

POST_DIR="$HOME/github/oliverjessner.github.io/collections/_posts"
mkdir -p "$POST_DIR"

today="$(date +%Y-%m-%d)"
timestamp="$(date '+%Y-%m-%d %H:%M:%S %z')"

slug=""
if [[ $# -gt 0 ]]; then
  slug="$(printf '%s' "$*" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//')"
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

echo "Created: $filepath"

open -a "Visual Studio Code" "$filepath"