#!/usr/bin/bash

npm run build

cd ../aplus_bss_web/

git checkout dev

git rm ./web/* -r

rsync -arvP ../aplus_bss_dev/web/* ./web/

git add -f .

git commit -m "build.sh"

git pull

git push origin dev
