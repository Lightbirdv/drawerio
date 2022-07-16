FROM nginx:alpine
COPY ./certs/fullchain.pem /etc/letsencrypt/live/drawerio.com/fullchain.pem
COPY ./certs/privkey.pem /etc/letsencrypt/live/drawerio.com/privkey.pem
COPY ./certs/options-ssl-nginx.conf /etc/letsencrypt/options-ssl-nginx.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
