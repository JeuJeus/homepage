#!/bin/sh
/matomo-scraper/import_logs.py  --url=$MATOMO_URL --token-auth=$MATOMO_TOKEN --recorders=4 --enable-http-errors --enable-http-redirects --enable-static --enable-bots `date --date=yesterday +/var/log/nginx/access-\%Y-\%m-\%d.log`
