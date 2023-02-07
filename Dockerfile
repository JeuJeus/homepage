FROM nginx:stable-alpine

# Remove sym links from nginx image
RUN rm /var/log/nginx/access.log
RUN rm /var/log/nginx/error.log
RUN apk add logrotate
COPY config/cron.daily/logrotate.sh /etc/cron.daily/logrotate
COPY config/logrotate.conf /etc/logrotate.conf
COPY config/logrotate.d/nginx /etc/logrotate.d/nginx

RUN mkdir /matomo-scraper
RUN wget https://raw.githubusercontent.com/matomo-org/matomo-log-analytics/4.x-dev/import_logs.py -o /matomo-scraper/import_logs.py
COPY config/cron.daily/matomo-importer-script.sh /etc/cron.daily/matomo-importer-script.sh

COPY static /usr/share/nginx/html

CMD crond && nginx -g 'daemon off;'
