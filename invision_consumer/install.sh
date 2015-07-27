#!/bin/bash

set -e

if [ ! -d "./node_modules" ]; then
  npm install > /dev/null 
  gulp build  > /dev/null
else
  gulp build  > /dev/null
fi


echo ["Done"]
