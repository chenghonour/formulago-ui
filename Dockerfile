FROM nginx:1.17.1-alpine

COPY dist/ /usr/share/nginx/html/
#COPY deploy/default.conf /etc/nginx/conf.d/
COPY deploy/nginx.conf /etc/nginx/

LABEL MAINTAINER="czx"

EXPOSE 80
