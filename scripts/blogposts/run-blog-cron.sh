#!/bin/sh
set -eu

if [ "$#" -ne 1 ]; then
    printf 'Usage: /bin/sh run-blog-cron.sh <feed:random|top:random>\n' >&2
    exit 2
fi

blog_mode=$1
case "$blog_mode" in
    feed:random|top:random) ;;
    *)
        printf 'Unsupported scheduled blog mode: %s\n' "$blog_mode" >&2
        exit 2
        ;;
esac

blog_root=$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd -P)
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
export TZ="Europe/Vienna"
export BLOG_OPEN_BROWSER=0
export GIT_TERMINAL_PROMPT=0

umask 077
blog_log_dir="$blog_root/.cache/blog/logs"
mkdir -p "$blog_log_dir"
blog_log_file="$blog_log_dir/$(date '+%Y-%m-%d_%H-%M-%S')-${blog_mode%:random}-random-$$.log"
exec >> "$blog_log_file" 2>&1

cd "$blog_root"
printf '[%s] Starting npm run blog:%s\n' "$(date '+%Y-%m-%d %H:%M:%S %Z')" "$blog_mode"
if npm run "blog:$blog_mode" < /dev/null; then
    blog_status=0
else
    blog_status=$?
fi
printf '[%s] Finished npm run blog:%s (exit %s)\n' "$(date '+%Y-%m-%d %H:%M:%S %Z')" "$blog_mode" "$blog_status"
exit "$blog_status"
