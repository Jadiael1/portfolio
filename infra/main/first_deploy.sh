#!/bin/bash
set -Eeuo pipefail
export PATH=/usr/sbin:/usr/bin:/sbin:/bin
export DOCKER_CONFIG=/opt/apps/portfolio-jadiael-front/docker-auth

cd /opt/apps/portfolio-jadiael-front

exec 9>/run/lock/portfolio-jadiael-front-deploy.lock
flock -x -w 120 9

NEW_TAG=production-0857610cba36304cb29b0e5040333e189d0d3f6e
IMAGE=ghcr.io/jadiael1/portfolio-jadiael-front

test "$(grep -c '^IMAGE_TAG=' .env || true)" = 1

docker image inspect "$IMAGE:$NEW_TAG" >/dev/null 2>&1 ||
    docker pull "$IMAGE:$NEW_TAG"

IMAGE_TAG="$NEW_TAG" docker compose config --quiet

IMAGE_TAG="$NEW_TAG" docker compose up \
    -d \
    --no-deps \
    --pull never \
    --wait \
    --wait-timeout 120 \
    web

curl \
    --fail \
    --silent \
    --show-error \
    --max-time 30 \
    --output /dev/null \
    --header "Host: jadiael.dev" \
    "http://127.0.0.1:3006/"

sed -i "s/^IMAGE_TAG=.*/IMAGE_TAG=$NEW_TAG/" .env
chown root:root .env
chmod 600 .env

docker compose ps
grep '^IMAGE_TAG=' .env

flock -u 9
exec 9>&-