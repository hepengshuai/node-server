#!/bin/bash

cd ~
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm use v18.19.0

cd test1
for x in {1..4}; do
    num=`printf "%03d" $x`;
    pm2 start ecosystem.config.js --env prod --only ins${num};
    sleep 5
done
