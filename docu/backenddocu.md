# This is a Developer docu for the nodejs express backend using postgreSQL:
## For local development
### Install and configure psql
#### Installation
Windows: https://www.postgresql.org/download/windows/
Ubuntu: sudo apt-get -y install postgresql
#### Create user for service
// in cmd terminal

```
- psql postgres
- CREATE ROLE _rolename_ WITH LOGIN PASSWORD _'pw'_;
- ALTER ROLE _rolename_ CREATEDB;
- \q
- psql -d postgres -U _rolename_
- CREATE DATABASE drawerio;
- close
```

### Install and configure nodejs
// in backend-express folder
```
- yarn install
- create .env file
- copy structure from .envdummy file:
- generate ACCESS_TOKEN_SECRET in Terminal: 
    node
    require('crypto').randomBytes(64).toString('hex')
    copy to .env 
- same for REFRESH_TOKEN_SECRET
- yarn db:create
- yarn db:seed
- start with yarn start
```
## For docker setup
### Using docker-compose
```
- navigate to root of drawerio project
- docker-compose up --build -d 
  to launch all docker container in the project
- docker-compose down
  to take down all docker container in the project
```

### Using dockerfile, requires local postgres db or postgres docker container
```
- navigate to backend-express 
- docker build -t drawerioapp .
- docker run -p <port>:8080 drawerioapp -d
- check for docker container using docker ps
```
### API endpoints & Swagger docu:
#### Default port: 5000 if you want to change it APIPORT in .env and Bearer token for locked swagger api endpoints with lock top right

### Backend Endpoints
#### root path:
```
- GET / redirects to swagger docu
- GET /api-docs for swagger docu
```
#### user path:
```
- GET /user/all returns all user
    - security:
        JWT token 
        only accessible for admins
- GET /user/{id} returns specific user
    - security:
        JWT token
    - parameter:  
        id of user
    - returns:
        200 with user object:
        {
            users_id: number;
            email: string;
            password: string;
            isAdmin: string;
            refreshtoken: string;
            forgottoken: string;
            forgotExpires: number;
            confirmationtoken: string;
            enabled: boolean;
        }
        404 user not found
        500 error
- PATCH /user/{id} updates specific user
    - security:
        JWT token
        only admin or author
    - parameter:
        id of user
        email of user
        password of  user
    - returns:
        201 with message:
        {
            "successfully changed a user"
        }
        404 user not found
        500 error 
- DELETE /user/{id} deletes specific user
    - security:
        JWT token
        only admin or author
    - parameter:
        id of user
    - returns:
        201 with message:
        {
            "successfully deleted a user"
        }
        404 user not found
        500 error
- POST /user/register register specific user 
    - parameter: 
        email of user  
        password of  user 
    - returns:
        201 success
        500 error
- POST /user/promotetoadmin promotes user to admin 
    - parameter: 
        id of user
    - security:
        JWT only for admins
    - returns:
        201 success
        500 error
- POST /user/forgot sends an email to the user for a forgot passwort reset link
    - parameter: 
        email of user
    - security:
    
    - returns:
        200 success
        500 error

- POST /user/confirm sends an email to the user with a confirmation link
    - parameter: 
        email of user
    - security:
    
    - returns:
        200 success
        500 error

- POST /user/passwordReset/{hash} takes the hash and changes the password of the user
    - parameter: 
        hash of user
        new password
    - security:
    
    - returns:
        200 success
        500 error

- POST /user/confirmation/{hash} takes the hash and enables the account of the user    
    - parameter: 
        hash of user
    - security:
    
    - returns:
        200 success
        500 error

```
#### drawer path:
```
- GET /drawer/all returns all drawer
- GET /drawer/all/user returns all drawer for user
- GET /drawer/{id} returns specific drawer
    - parameter: 
        id of drawer
- PATCH /drawer/{id} updates specific drawer 
    - parameter: 
        id of drawer 
        drawerTitle 
- DELETE /drawer/{id} deletes specific drawer
    - parameter:
        id of drawer
- POST /drawer/add create specific drawer
    - parameter:
        drawerTitle
- GET /drawer/search/findBy?searchTerm search for drawer by title 
```
#### drawerentry path:
```
- GET /drawerentry/all returns all drawer
- GET /drawerentry/all/{drawerid} returns all drawerentry for drawer
    - parameter: 
        id of drawer
- GET /drawerentry/{id} returns specific drawerentry
    - parameter: 
        id of drawerentry
- PATCH /drawerentry/{id} updates specific drawerentry 
    - parameter: 
        id of drawerentry
        comment
        imageURL[]
        selTexT
- DELETE /drawerentry/{id} deletes specific drawerentry
    - parameter:
        id of drawer
- POST /drawerentry/add create specific drawerentry
    - parameter:
        comment
        imageURL[]
        drawerid
        originURL
        selText
- GET /drawerentry/search/findBy?drawer&searchTerm search drawerentry by comment, title or originURL
```
#### auth path:
```
- POST /auth/login login user return jwt
    - parameter:
        email of user
        password of user 
- POST /auth/token returns refresh Token
- POST /auth/tokenRefresh returns refreshed access Token
- POST /auth/isAdmin returns if user is admin or not
- POST /auth/logout deletes refresh token of User
``` 
 .