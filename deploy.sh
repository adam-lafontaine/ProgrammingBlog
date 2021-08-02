#!/bin/sh
# chmod +x deploy.sh

# on client:
# npm run build

# on server:
# npm run build

# remove existing client files on server
rm -rfv server/client_files/*

# copy client files to server
cp -a client/dist/. server/client_files/

# on server:
# npm run start