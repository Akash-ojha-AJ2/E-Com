#!/bin/bash
set -e

# go to client
cd client || { echo "client folder not found"; exit 1; }

# If npm is available, build; otherwise expect client/build to already exist
if command -v npm >/dev/null 2>&1; then
  echo "npm found — installing & building..."
  npm ci
  npm run build
  BUILD_DIR="build"
else
  echo "npm NOT found in container. Will try to serve prebuilt files from client/build"
  BUILD_DIR="build"
fi

# serve the build folder — try python3, then python, then busybox/httpd, else fail
if [ -d "$BUILD_DIR" ]; then
  echo "Serving $BUILD_DIR on port ${PORT:-3000}"
  cd "$BUILD_DIR"
  if command -v python3 >/dev/null 2>&1; then
    exec python3 -m http.server "${PORT:-3000}"
  elif command -v python >/dev/null 2>&1; then
    exec python -m http.server "${PORT:-3000}"
  elif command -v busybox >/dev/null 2>&1; then
    exec busybox httpd -f -p "${PORT:-3000}"
  else
    echo "No static file server found (python/busybox). Cannot serve build files."
    exit 1
  fi
else
  echo "Build directory not found and npm not available to build. Aborting."
  exit 1
fi
