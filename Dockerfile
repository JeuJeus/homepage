FROM nginx:stable-alpine

RUN apk update && apk add logrotate

COPY matomo-nginx/nginx.conf /etc/nginx/nginx.conf
COPY matomo-nginx/logrotate.d/nginx /etc/logrotate.d/nginx
COPY static /usr/share/nginx/html

RUN (echo -e "*   0   *   *   *   /usr/sbin/logrotate --force --verbose /etc/logrotate.conf\n") | crontab -

CMD crond -b && nginx -g 'daemon off;'
