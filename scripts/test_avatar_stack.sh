#!/usr/bin/env bash

set -euo pipefail

AVATAR_HOST="${AVATAR_HOST:-http://127.0.0.1:8001}"
SITE_HOST="${SITE_HOST:-http://127.0.0.1:3000}"

echo "Checking avatar backend health at ${AVATAR_HOST}"
curl --fail --silent "${AVATAR_HOST}/health" >/tmp/avatar-health.json
cat /tmp/avatar-health.json
echo

echo "Checking avatar wake endpoint"
curl --fail --silent -X POST "${AVATAR_HOST}/api/wake" >/tmp/avatar-wake.json
cat /tmp/avatar-wake.json
echo

echo "Checking avatar token endpoint"
curl --fail --silent -X POST "${AVATAR_HOST}/api/token" >/tmp/avatar-token.json
cat /tmp/avatar-token.json
echo

echo "Checking portfolio avatar lab route at ${SITE_HOST}/avatar-lab/"
curl --fail --silent "${SITE_HOST}/avatar-lab/" | head -n 20
echo

echo "Smoke test passed."
