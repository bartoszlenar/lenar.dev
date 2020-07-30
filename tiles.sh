docker run \
    -it \
    --rm \
    --name lenardev-tiles \
    -v "$PWD":/usr/src/myapp \
    -v "$PWD/vendor/pip_cache":/root/.cache/pip \
    -w /usr/src/myapp python:3 \
    /bin/bash -c "pip install image && python generate_tiles.py"
