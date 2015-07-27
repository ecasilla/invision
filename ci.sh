#!/bin/bash

cd invision_producer/ && npm i && npm run build
sleep 5
cd ../
cd invision_consumer/ && npm i && npm run build
