#!/bin/sh
room=$1
msg=$2
curl -X POST -H "Content-Type: application/json" -d "{\"room\" : \"$room\" , \"msg\" : \"$msg\"}" localhost:5080/chat
