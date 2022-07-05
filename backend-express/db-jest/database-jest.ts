export const databasequery = `CREATE DATABASE ${process.env.DBTEST};`;

// user table

export const tableuserquery = `CREATE TABLE IF NOT EXISTS users(
    users_id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN DEFAULT false,
    refreshToken VARCHAR(255),
    forgotToken VARCHAR(255),
    forgotExpires TIMESTAMP
);`;

// drawer table

export const tabledrawerquery = `CREATE TABLE IF NOT EXISTS drawer(
    drawer_id SERIAL PRIMARY KEY,
    drawerTitle VARCHAR(50) NOT NULL,
    creationDate TIMESTAMP NOT NULL,
    drawerLogo BYTEA,
    users_id INTEGER,
    CONSTRAINT fk_users
        FOREIGN KEY(users_id) 
	        REFERENCES users(users_id) ON DELETE CASCADE
);`;

// drawerentries table

export const tabledrawerentriesquery = `CREATE TABLE IF NOT EXISTS drawerentries(
    drawerentry_id SERIAL PRIMARY KEY,
    creationDate TIMESTAMP NOT NULL,
    originURL VARCHAR(255),
    comment VARCHAR,
    selText VARCHAR,
    imageURL TEXT[],
    drawer_id INTEGER,
    CONSTRAINT fk_drawer
        FOREIGN KEY(drawer_id) 
	        REFERENCES drawer(drawer_id) ON DELETE CASCADE
);`;
