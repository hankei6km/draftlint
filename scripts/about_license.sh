#!/bin/sh
set -e

ORG_LICENSE="LICENSE"
ABOUT_LICENSE_TS="src/aboutLicense.ts"

echo "// this file was generated from /LICENSE by /scripts/about_license.sh" > "${ABOUT_LICENSE_TS}"
echo "" >> "${ABOUT_LICENSE_TS}"
echo 'const AboutLicense = () =>' >> "${ABOUT_LICENSE_TS}"
echo -n "'" >> "${ABOUT_LICENSE_TS}"
cat "${ORG_LICENSE}" | sed -e 's/$/\\n/' | tr -d "\n" >> "${ABOUT_LICENSE_TS}"
echo "';" >> "${ABOUT_LICENSE_TS}"
echo "export default AboutLicense;"  >> "${ABOUT_LICENSE_TS}"