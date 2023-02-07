#!/bin/sh
python3 /matomo-scraper/import_logs.py --idsite $MATOMO_SITE_ID  --url=$MATOMO_URL --token-auth=$MATOMO_TOKEN --recorders=4 --enable-http-errors --enable-http-redirects --enable-static --enable-bots `date --date=yesterday +/var/log/nginx/access-\%Y-\%m-\%d.log`
