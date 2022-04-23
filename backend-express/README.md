creating nodejs application: 
npm init -y
install yarn:
npm install --global yarn
initialize typescript:
yarn add -D typescript
create tsconfig file:
npx tsc --init
add build tsc to package json:
"build": "tsc"
build files: 
yarn build
add ts-node for automatic build:
yarn add -D ts-node
point ts-node to index:
"start": "ts-node src/index.ts",
start script:
yarn start
ts-node-dev for server:
yarn add -D ts-node-dev

yarn add express
yarn add -D @types/express