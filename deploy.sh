#!/bin/bash

cd /tmp
git clone git@github.com:mdlufy/shacex-ships.git
test $? -ne 0 && exit 

cd shacex-ships/
npm i
ng build --output-path docs --base-href /shacex-ships/
rm -rf /tmp/shacex-ships-build
cp -r docs /tmp/shacex-ships-build

cd  /tmp/shacex-ships
test $? -ne 0 && exit 

git checkout gh-pages
rm -rf /tmp/shacex-ships/*
mv /tmp/shacex-ships-build/* /tmp/shacex-ships
cp /tmp/shacex-ships/index.html /tmp/shacex-ships/404.html
git add .
git commit -m deploy --allow-empty
git push

cd /tmp
rm -rf shacex-ships
rm -rf shacex-ships-build 