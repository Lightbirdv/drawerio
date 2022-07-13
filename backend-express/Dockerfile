FROM node:16-alpine


RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY ./dist ./dist

EXPOSE 5000
CMD yarn start:prod