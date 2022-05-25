"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pool = require('../../queries').pool;
const jwt = require('jsonwebtoken');
function getDrawers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const drawers = yield pool.query('SELECT * FROM drawer ORDER BY drawer_id ASC');
        return drawers.rows;
    });
}
function getDrawersByUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const drawers = yield pool.query('SELECT * FROM drawer where users_id=$1 ORDER BY drawer_id ASC', [req.user.users_id]);
        return drawers.rows;
    });
}
function getSingleDrawer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pool.query('SELECT * FROM drawer WHERE drawer_id=$1', [req.params.id]);
        let drawer = {
            drawer_id: result.rows[0].drawer_id,
            drawerTitle: result.rows[0].drawertitle,
            creationDate: result.rows[0].creationdate,
            drawerLogo: result.rows[0].drawerlogo,
            users_id: result.rows[0].users_id,
        };
        return drawer;
    });
}
function updateDrawer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const drawer = yield getSingleDrawer(req, res);
        const newUser = pool.query('UPDATE drawer SET drawer_id=$1, drawerTitle=$2, creationDate=$3, users_id=$4  WHERE drawer_id=$5', [
            (req.body.drawer_id != null && req.body.drawer_id.length ? req.body.drawer_id : drawer.drawer_id),
            (req.body.drawerTitle != null && req.body.drawerTitle.length ? req.body.drawerTitle : drawer.drawerTitle),
            (req.body.creationDate != null && req.body.creationDate.length ? req.body.creationDate : drawer.creationDate),
            (req.body.users_id != null && req.body.users_id.length ? req.body.users_id : drawer.users_id),
            req.params.id
        ]);
        return newUser;
    });
}
function deleteDrawer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = pool.query('DELETE FROM drawer WHERE drawer_id=$1', [req.params.id]);
        return user;
    });
}
function addDrawer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var drawer = req.body;
        drawer.users_id = req.user.users_id;
        drawer.creationDate = new Date();
        let newDrawer = pool.query('INSERT INTO drawer (drawerTitle,creationDate, users_id) VALUES ($1,$2,$3)   RETURNING *', [drawer.drawerTitle, drawer.creationDate, drawer.users_id]);
        return newDrawer;
    });
}
function addDefaultDrawer(users_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const newDrawer = pool.query('INSERT INTO drawer (drawerTitle,creationDate, users_id) VALUES ($1,$2,$3) RETURNING *', ["My first Drawer!", new Date(), users_id]);
        return newDrawer;
    });
}
function isAuthorOrAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let drawer = yield getSingleDrawer(req, res);
        if (!drawer || !req.user)
            return res.sendStatus(401);
        if (req.user.isadmin == true) {
            next();
        }
        else if (drawer.users_id == req.user.users_id) {
            next();
        }
        else {
            return res.status(500).send({ message: 'This function is only available for admins or the user of the drawer' });
        }
    });
}
module.exports = {
    getDrawers,
    getDrawersByUser,
    getSingleDrawer,
    updateDrawer,
    deleteDrawer,
    addDrawer,
    addDefaultDrawer,
    isAuthorOrAdmin,
};
