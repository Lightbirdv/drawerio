FROM node:16-alpine


RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


COPY package.json .
COPY package-lock.json .

RUN npm install --force

COPY . .

EXPOSE 3000
CMD npm start