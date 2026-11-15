#!/usr/bin/env bash
# Packs the project into junior-toy-store.zip (without node_modules / dist).
set -euo pipefail
cd "$(dirname "$0")/.."
NAME="junior-toy-store"
rm -f "../$NAME.zip"
cd ..
zip -rq "$NAME.zip" "$NAME" -x "$NAME/node_modules/*" "$NAME/dist/*" "$NAME/*.zip" "*.DS_Store"
echo "✅ Архив создан: $(pwd)/$NAME.zip"
