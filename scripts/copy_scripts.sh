#!/bin/sh
set -e

SCRIPTS_PATH="public/scripts"
SCRIPTS_LITE_YT_EMBED="node_modules/lite-youtube-embed/src/lite-yt-embed.js"

test -d "${SCRIPTS_PATH}" || mkdir -p "${SCRIPTS_PATH}" 

cp "${SCRIPTS_LITE_YT_EMBED}" "${SCRIPTS_PATH}"