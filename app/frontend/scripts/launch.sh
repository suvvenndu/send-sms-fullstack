#!/bin/sh

#touch docroot file on container start 
find /usr/share/nginx/html -exec touch {} +

# build the front end config file
#source config.json.sh YOUR_PREFIX

#copy correct scopes for current run env to the doc root

#cp /tmp/scopes/scopes.$BUILD_ENVIRONMENT.json /usr/share/html/scopes.json

nginx -g "daemon off;"