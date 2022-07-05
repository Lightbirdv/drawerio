"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tabledrawerentriesquery = exports.tabledrawerquery = exports.tableuserquery = exports.databasequery = void 0;
exports.databasequery = `CREATE DATABASE ${process.env.DB};`;
// user table
exports.tableuserquery = `CREATE TABLE IF NOT EXISTS users(
    users_id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN DEFAULT false,
    refreshToken VARCHAR(255),
    forgotToken VARCHAR(255),
    forgotExpires TIMESTAMP,
    confirmationToken VARCHAR(255),
    enabled BOOLEAN DEFAULT false
);`;
// drawer table
exports.tabledrawerquery = `CREATE TABLE IF NOT EXISTS drawer(
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
exports.tabledrawerentriesquery = `CREATE TABLE IF NOT EXISTS drawerentries(
    drawerentry_id SERIAL PRIMARY KEY,
    creationDate TIMESTAMP NOT NULL,
    originURL VARCHAR(255),
    comment VARCHAR,
    selText VARCHAR,
    imageURL TEXT[],
    videoURL TEXT[],
    websiteContent TEXT,
    drawer_id INTEGER,
    CONSTRAINT fk_drawer
        FOREIGN KEY(drawer_id) 
	        REFERENCES drawer(drawer_id) ON DELETE CASCADE
);`;
