#!/bin/bash
set -e

cd client
npm install
npm run build

npx serve -s build -l "${PORT:-3000}"
