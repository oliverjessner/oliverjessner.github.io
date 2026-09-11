#!/usr/bin/env bash

set -euo pipefail

# ------------------------------------------------------------
# Daily Blog Summary
#
# 1. Findet alle Posts des heutigen Tages
# 2. Baut daraus die öffentlichen URLs
# 3. Liest prompts/summary.md
# 4. Öffnet ChatGPT mit Prompt + URLs
# ------------------------------------------------------------

# Repo-Root zuverlässig bestimmen
REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"

if [[ -z "$REPO_ROOT" ]]; then
    echo "Fehler: Git-Repository konnte nicht gefunden werden." >&2
    exit 1
fi

cd "$REPO_ROOT"

COLLECTION_DIR="collections/_posts"
PROMPT_FILE="prompts/summary.md"
BASE_URL="https://oliverjessner.at/blog"

TODAY="$(TZ=Europe/Vienna date +%F)"

fail() {
    echo "Fehler: $*" >&2
    exit 1
}

[[ -d "$COLLECTION_DIR" ]] ||
    fail "Collection-Verzeichnis nicht gefunden: $COLLECTION_DIR"

[[ -f "$PROMPT_FILE" ]] ||
    fail "Prompt-Datei nicht gefunden: $PROMPT_FILE"

TMP_FILE="$(mktemp)"
trap 'rm -f "$TMP_FILE"' EXIT

# ------------------------------------------------------------
# Alle heutigen Posts finden
# ------------------------------------------------------------

find "$COLLECTION_DIR" \
    -type f \
    -name "${TODAY}-*.md" \
    -print |
while IFS= read -r file; do

    filename="$(basename "$file")"
    slug="${filename%.md}"

    url="${BASE_URL}/${slug}/"

    # Uhrzeit aus Front Matter lesen,
    # damit neueste Artikel zuerst sortiert werden können.
    post_date="$(
        awk '
            /^date:/ {
                sub(/^date:[[:space:]]*/, "")
                print
                exit
            }
        ' "$file"
    )"

    printf '%s\t%s\n' "$post_date" "$url"

done > "$TMP_FILE"

if [[ ! -s "$TMP_FILE" ]]; then
    fail "Keine Posts für ${TODAY} gefunden."
fi

URLS="$(
    LC_ALL=C sort -r "$TMP_FILE" |
    cut -f2-
)"

# ------------------------------------------------------------
# Prompt laden
# ------------------------------------------------------------

PROMPT="$(cat "$PROMPT_FILE")"

PAYLOAD="${PROMPT}

${URLS}"

echo
echo "Posts für ${TODAY}:"
echo
echo "$URLS"
echo

# Payload zusätzlich in Zwischenablage
if command -v pbcopy >/dev/null 2>&1; then
    printf '%s' "$PAYLOAD" | pbcopy
fi

# ------------------------------------------------------------
# URL-Encoding
# ------------------------------------------------------------

ENCODED_PAYLOAD="$(
    printf '%s' "$PAYLOAD" |
    python3 -c '
import sys
import urllib.parse

text = sys.stdin.read()
print(urllib.parse.quote(text))
'
)"

CHATGPT_URL="https://chatgpt.com/?q=${ENCODED_PAYLOAD}"

# ------------------------------------------------------------
# ChatGPT öffnen
# ------------------------------------------------------------

open "$CHATGPT_URL"

pbcopy < prompts/summary-thumbnail.md

echo "Copied thumbnail prompt to clipboard. You can paste it into ChatGPT to generate a thumbnail image."
