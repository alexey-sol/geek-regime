#!/bin/bash

# Exports entries from the serialized object, passed via $1 argument, as environment variables
# (excluding those which start with "DEPLOY_" prefix). The solution is borrowed from [1].

while read -rd $'' line
do
    if [[ $s != DEPLOY_* ]]; then
        export "$line"
    fi
done < <(jq -r <<< $1 'to_entries|map("\(.key)=\(.value)\u0000")[]')

# [1]. https://stackoverflow.com/a/48513046/10874193
