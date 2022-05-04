import express from 'express'
const pool = require('../../queries').pool;

interface Drawer {
    drawerTitle: string;
    creationDate: Date,
    drawerLogo: string,
    users_id: number,
}


module.exports = {
    
};