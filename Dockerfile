FROM nginx:stable-alpine
COPY config/nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm /var/log/nginx/access.log
RUN rm /var/log/nginx/error.log
RUN apk add logrotate
COPY config/cron.daily/logrotate.sh /etc/cron.daily/logrotate.sh
COPY config/logrotate.conf /etc/logrotate.conf
COPY config/logrotate.d/nginx /etc/logrotate.d/nginx

RUN apk add --no-cache python3 py3-pip
RUN apk add coreutils
RUN mkdir /matomo-scraper
RUN wget https://raw.githubusercontent.com/matomo-org/matomo-log-analytics/4.x-dev/import_logs.py -O /matomo-scraper/import_logs.py
COPY config/cron.daily/matomo-importer-script.sh /etc/cron.daily/matomo-importer-script.sh

COPY static /usr/share/nginx/html

CMD crond -f -l 2 -L /dev/stdout && nginx -g 'daemon off;'
