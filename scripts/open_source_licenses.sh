#!/bin/sh
set -e

PUBLIC_PATH="public"
LICENSES_TXT="open_source_licenses.txt"
LICENSES_ZIP="${PUBLIC_PATH}/open_source_licenses.zip"

test -d "${PUBLIC_PATH}" || mkdir "${PUBLIC_PATH}" 
test -e "${LICENSES_ZIP}" && rm "${LICENSES_ZIP}"

cat LICENSE > "${LICENSES_TXT}"
echo "" >> "${LICENSES_TXT}"
echo "" >> "${LICENSES_TXT}"
echo "---" >> "${LICENSES_TXT}"
echo "" >> "${LICENSES_TXT}"
echo "template: [TypeScript Next.js example](https://github.com/vercel/next.js/tree/canary/examples/with-typescript)" >> "${LICENSES_TXT}"
echo "MIT License" >> "${LICENSES_TXT}"
echo "" >> "${LICENSES_TXT}"
echo "template: [Material UI Next.js example](https://github.com/mui-org/material-ui/tree/next/examples/nextjs)" >> "${LICENSES_TXT}"
echo "MIT License" >> "${LICENSES_TXT}"
echo "" >> "${LICENSES_TXT}"
echo "---" >> "${LICENSES_TXT}"
echo "" >> "${LICENSES_TXT}"

NODE_ENV=production yarn --silent licenses generate-disclaimer >> "${LICENSES_TXT}"

zip -9 -m "${LICENSES_ZIP}" "${LICENSES_TXT}"