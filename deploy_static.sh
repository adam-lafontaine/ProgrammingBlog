#!/bin/sh
# chmod +x deploy_static.sh

# cd static_bv_client:
# npm run build

# remove existing client files on server
rm -rfv docs/*

# copy client files to server
cp -a static_bv_client/dist/. docs/