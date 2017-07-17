#!/usr/bin/env bash

git checkout gh-pages
git reset --hard origin/master

ember build -e=production

ls -1 | grep -v -E '^dist|CNAME|circle.yml$' | xargs rm -rf
mv dist/* ./
mv dist/.* ./
rm -rf dist

git add .
git commit -m "gh pages deploy"
git push -f

git checkout master
yarn install
