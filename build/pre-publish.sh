#!/bin/bash

VERSION=$(node --eval "console.log(require('./package.json').version);")

git checkout -b pre-release-v$VERSION

npm run babel
git add lib/ -f

git commit -m "v$VERSION"
git push -u origin pre-release-v$VERSION

git checkout master
