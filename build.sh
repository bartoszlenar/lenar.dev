docker run \
    --name lenardev \
    --rm \
    --volume="$PWD:/srv/jekyll" \
    --volume="$PWD/vendor/bundle:/usr/local/bundle" \
    --env JEKYLL_ENV=production \
    --workdir="/srv/jekyll/source" \
    jekyll/jekyll:3.8 \
    /bin/bash -c "rm -rf ../site/ && jekyll build -d ../site/"