FROM nginx:stable-alpine
COPY matomo-nginx/nginx.conf /etc/nginx/nginx.conf
COPY static /usr/share/nginx/html
