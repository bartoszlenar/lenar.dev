[  -z "$GITHUB_TOKEN" ] && echo "GITHUB_TOKEN env is missing" && exit 1
[  -z "$GITHUB_SHA" ] && echo "GITHUB_SHA env is missing" && exit 1

echo "Setting temp-publish-repo folder"

rm -rf temp-publish-repo/

mkdir -p temp-publish-repo/

cd temp-publish-repo/

git init
git config --local user.email "bartosz@lenar.dev"
git config --local user.name "Bartosz Lenar"
git remote add -t gh-pages -f origin https://x-access-token:$GITHUB_TOKEN@github.com/bartoszlenar/lenar.dev
git checkout gh-pages

echo "Building the site"

cd ../

bash build.sh

echo "Copying the built content"

cp -r site/. temp-publish-repo/.

cd temp-publish-repo/

echo "Pushing"

git add -A

git commit -m "Update from main: $GITHUB_SHA"

git push origin gh-pages
