#!/bin/sh

#chmod +x deploy.sh

rm -rfv server/client/*
cp -a client/dist/. server/client/