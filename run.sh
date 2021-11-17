#!/usr/bin/env bash

cd "`dirname "$0"`"

source ./.env
vite --host &> ./log.txt