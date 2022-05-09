CREATE DATABASE drawerio;

--user table

CREATE TABLE users(
    users_id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    refreshToken VARCHAR(50),
    forgotToken VARCHAR(50),
    forgotExpires TIMESTAMP
);

--drawer table

CREATE TABLE drawer(
    drawer_id SERIAL PRIMARY KEY,
    drawerTitle VARCHAR(50) NOT NULL,
    creationDate TIMESTAMP NOT NULL,
    drawerLogo BYTEA,
    users_id INTEGER,
    CONSTRAINT fk_users
        FOREIGN KEY(users_id) 
	        REFERENCES users(users_id)
);

--drawerentries table

CREATE TABLE drawerentries(
    drawerentry_id SERIAL PRIMARY KEY,
    creationDate TIMESTAMP NOT NULL,
    comment VARCHAR(255),
    imageURL VARCHAR(50),
    drawer_id INTEGER,
    CONSTRAINT fk_drawer
        FOREIGN KEY(drawer_id) 
	        REFERENCES drawer(drawer_id)
);