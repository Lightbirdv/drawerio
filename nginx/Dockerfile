FROM nginx:alpine
COPY ./certs/ssl_passphrase.txt /etc/nginx/certs/ssl_passphrase.txt
COPY ./certs/localhost.crt /etc/nginx/certs/localhost.crt
COPY ./certs/localhost.key /etc/nginx/certs/localhost.key
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
