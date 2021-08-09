#!/bin/sh
# chmod +x deploy.sh

# in bv_client:
# npm run build

# in express_server:
# npm run build

# remove existing client files on server
rm -rfv express_server/client_files/*

# copy client files to server
cp -a bv_client/dist/. express_server/client_files/

# in express_server:
# npm run start