#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="master"
TARGET_BRANCH="gh-pages"

REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}

cd $HOME
rm -rf decks-publish/**/* || exit 0
git clone $REPO decks-publish
cd decks-publish

SHA=`git rev-parse --verify HEAD`

git checkout -b TEMP_BRANCH
npm install --loglevel error

echo -e "#-- TEMP CHANGES TO GITIGNORE FOR DEPLOYMENT --\nREADME.md\n.editorconfig\n.pug-lintrc\n.sass-lint.yml\ndeploy*\ngulp-tasks\ngulpfile.js\npackage.json\npublish.sh\nsrc\n\n$(cat .gitignore)" > .gitignore
gulp build

mv dist/* .
rmdir dist

git add . --all
git commit -m "Build for gh-pages: ${SHA}"

git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
git merge -s recursive -X theirs TEMP_BRANCH -m "Merge into gh-pages: ${SHA}" || true
git status --porcelain | awk '{if ($1=="DU") print $2}' | xargs git rm
git add .
git commit -m "Merge into gh-pages: ${SHA}"

git push $SSH_REPO $TARGET_BRANCH
git branch -D TEMP_BRANCH
