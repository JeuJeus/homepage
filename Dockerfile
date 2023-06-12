FROM nginx:stable-alpine

RUN apk update && apk add logrotate

COPY matomo-nginx/nginx.conf /etc/nginx/nginx.conf
COPY static /usr/share/nginx/html

CMD crond -b && nginx -g 'daemon off;'
