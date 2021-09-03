#!/bin/sh

# Generates config.json from environment variables. Only used in nginx docker container at run time.
# If changes are made here, ensure to reflect them in generate-config.js
export MINIAPPNAME="$1" | tr '[:upper:]' '[:lower:]'
env | grep "NABX_$MINIAPPNAME" | grep "FRONTEND" | jq --slurp --raw-input 'split("\n")[:-1] |
map([ split("=")[] ] )|
map({
  (.[0]): .[1]
})| add' > config.json

cat config.json | jq