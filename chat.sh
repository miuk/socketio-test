#!/bin/sh
# REST API 呼び出しテスト
room=$1
msg=$2
curl -X POST -H "Content-Type: application/json" -d "{\"room\" : \"$room\" , \"msg\" : \"$msg\"}" localhost:5080/chat
