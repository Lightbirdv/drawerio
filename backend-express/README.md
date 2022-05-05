# PostgreSQL

## Installation
Windows: https://www.postgresql.org/download/windows/
Ubuntu: sudo apt-get -y install postgresql

## DB
psql -U postgres // postgres is default user
\dt for relations
\c for switching table
\l for list

# Express Backend

## Create Nodejs Application: 
npm init -y
npm install --global yarn
### initialize typescript:
yarn add -D typescript
npx tsc --init
"build": "tsc"
### build files: 
yarn build
yarn add -D ts-node
"start": "ts-node src/index.ts",
### start script:
yarn start
ts-node-dev for server:
yarn add -D ts-node-dev
yarn add express
yarn add -D @types/express

generate secret for env:
node
require('crypto').randomBytes(64).toString('hex')