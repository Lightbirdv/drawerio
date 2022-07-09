FROM node:16-alpine


RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


COPY package.json .
COPY yarn.lock .
COPY initdb.sql .

RUN yarn install

COPY ./dist .

EXPOSE 3000
CMD yarn start