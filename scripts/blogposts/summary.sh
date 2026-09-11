#!/usr/bin/env bash

set -euo pipefail

# ------------------------------------------------------------
# Daily Summary
#
# 1. Findet alle heutigen Markdown-Posts
# 2. Baut daraus die öffentlichen URLs
# 3. Liest prompts/summary.md
# 4. Übergibt Prompt + URLs an ChatGPT
# ------------------------------------------------------------

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$REPO_ROOT"

COLLECTION_DIR="${COLLECTION_DIR:-collections/_posts}"
PROMPT_FILE="${PROMPT_FILE:-prompts/summary.md}"
BASE_URL="${BASE_URL:-https://oliverjessner.at/blog}"

# Entscheidend ist der Salzburger/Wiener Kalendertag.
TODAY="${TODAY:-$(TZ=Europe/Vienna date +%F)}"

fail() {
    printf 'Fehler: %s\n' "$*" >&2
    exit 1
}

# Einzelnen Wert aus dem YAML-Front-Matter lesen.
frontmatter_value() {
    local key="$1"
    local file="$2"

    awk -v key="$key" '
        NR == 1 && $0 ~ /^---[[:space:]]*$/ {
            in_frontmatter = 1
            next
        }

        in_frontmatter && $0 ~ /^---[[:space:]]*$/ {
            exit
        }

        in_frontmatter &&
        $0 ~ "^[[:space:]]*" key ":[[:space:]]*" {
            sub("^[[:space:]]*" key ":[[:space:]]*", "")
            print
            exit
        }
    ' "$file" |
        sed -E "s/^[[:space:]]*['\"]//; s/['\"][[:space:]]*$//"
}

# String URL-encoden, damit er als ChatGPT-Prompt übergeben werden kann.
urlencode() {
    local string="$1"
    local encoded=""
    local c
    local i
    local hex

    LC_ALL=C

    for ((i = 0; i < ${#string}; i++)); do
        c="${string:i:1}"

        case "$c" in
            [a-zA-Z0-9.~_-])
                encoded+="$c"
                ;;
            *)
                printf -v hex '%%%02X' "'$c"
                encoded+="$hex"
                ;;
        esac
    done

    printf '%s' "$encoded"
}

[[ -d "$COLLECTION_DIR" ]] ||
    fail "Collection-Verzeichnis nicht gefunden: $COLLECTION_DIR"

[[ -f "$PROMPT_FILE" ]] ||
    fail "Prompt-Datei nicht gefunden: $PROMPT_FILE"

TMP_FILE="$(mktemp)"
trap 'rm -f "$TMP_FILE"' EXIT

# ------------------------------------------------------------
# Heutige Posts sammeln
# ------------------------------------------------------------

while IFS= read -r file; do
    filename="$(basename "$file")"
    post_date="$(frontmatter_value date "$file")"

    # Primär Front-Matter prüfen.
    # Dateiname ist Fallback.
    if [[ "$post_date" != "$TODAY"* &&
          "$filename" != "$TODAY"-*.md ]]; then
        continue
    fi

    # Beispiel:
    #
    # 2026-09-11-mein-artikel.md
    #
    # ->
    #
    # https://oliverjessner.at/blog/2026-09-11-mein-artikel/

    slug="${filename%.md}"
    url="${BASE_URL%/}/${slug}/"

    # Damit später der neueste Artikel zuerst kommt.
    sort_key="${post_date:-$filename}"

    printf '%s\t%s\n' "$sort_key" "$url" >> "$TMP_FILE"

done < <(
    find "$COLLECTION_DIR" \
        -type f \
        -name '*.md' \
        -print
)

if [[ ! -s "$TMP_FILE" ]]; then
    fail "Keine Markdown-Posts für $TODAY gefunden."
fi

# Neueste zuerst
URLS="$(
    LC_ALL=C sort -r "$TMP_FILE" |
        cut -f2-
)"

# ------------------------------------------------------------
# Prompt bauen
# ------------------------------------------------------------

PROMPT="$(cat "$PROMPT_FILE")"

PAYLOAD="${PROMPT}"$'\n\n'"${URLS}"

printf '\nPosts für %s:\n\n%s\n\n' "$TODAY" "$URLS"

# Zusätzlich in die macOS-Zwischenablage.
# Falls ChatGPT den URL-Prompt einmal nicht korrekt übernimmt,
# reicht Cmd+V.
if command -v pbcopy >/dev/null 2>&1; then
    printf '%s' "$PAYLOAD" | pbcopy
fi

# ------------------------------------------------------------
# ChatGPT öffnen
# ------------------------------------------------------------

ENCODED_PAYLOAD="$(urlencode "$PAYLOAD")"

CHATGPT_URL="https://chatgpt.com/?q=${ENCODED_PAYLOAD}"

if command -v open >/dev/null 2>&1; then
    open "$CHATGPT_URL"
elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "$CHATGPT_URL" >/dev/null 2>&1 &
else
    fail "Browser konnte nicht automatisch geöffnet werden."
fi