docker run \
    --name lenardev-serve \
    --rm \
    -it \
    --volume="$PWD:/srv/jekyll" \
    --volume="$PWD/vendor/bundle:/usr/local/bundle" \
    --env JEKYLL_ENV=development \
    -p 4000:4000 \
    --workdir="/srv/jekyll/source" \
    jekyll/jekyll:3.8 \
    /bin/bash -c "rm -rf ../site/ && jekyll serve --incremental --future --unpublished -d ../site/"
