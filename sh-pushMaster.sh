#!/usr/bin/bash

cd ../aplus_bss_web/

git checkout master

git rm ./web/* -r

rsync -arvP ../aplus_bss_dev/web/* ./web/

git add -f .

git commit -m "pushMaster.sh"

git pull

git push origin master
