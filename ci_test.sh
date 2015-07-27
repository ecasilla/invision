#!/bin/bash

set -e

cd invision_producer/ && npm test && cd ../ && cd invision_consumer/ && npm test

echo [Done]
