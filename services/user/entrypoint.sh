#!/bin/sh
set -e

cd /app && npm run typeorm -- migration:run

if [ "${1#-}" != "${1}" ] || [ -z "$(command -v "${1}")" ]; then
  set -- node "$@"
fi

exec "$@"

