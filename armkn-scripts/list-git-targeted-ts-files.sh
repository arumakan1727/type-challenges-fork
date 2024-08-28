#!/usr/bin/env bash
set -Eeuo pipefail

readonly search_dir="$1"

{
  git ls-files "$search_dir/**/*.ts";
  git status --porcelain --untracked-files "$search_dir" | sed -En 's/^[ MARC?][ MD?] (.*\.ts)$/\1/p';
} \
  | sort --unique
