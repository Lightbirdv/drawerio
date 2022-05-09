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
function getDrawers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const drawers = pool.query('SELECT * FROM drawer ORDER BY drawer_id ASC');
        console.log(drawers);
        return drawers;
    });
}
function getDrawer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const drawer = pool.query('SELECT * FROM drawer WHERE drawer_id=$1', [req.params.id]);
        console.log(drawer);
        return drawer;
    });
}
function updateDrawer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const drawer = yield getDrawer(req, res);
        let oldDrawer = {
            drawer_id: drawer.rows[0].drawer_id,
            drawerTitle: drawer.rows[0].drawerTitle,
            creationDate: drawer.rows[0].creationDate,
            users_id: drawer.rows[0].users_id
        };
        const newUser = pool.query('UPDATE drawer SET drawer_id=$1, drawerTitle=$2, creationDate=$3, users_id=$4  WHERE drawer_id=$5', [
            (req.body.drawer_id != null && req.body.drawer_id.length ? req.body.drawer_id : oldDrawer.drawer_id),
            (req.body.drawerTitle != null && req.body.drawerTitle.length ? req.body.drawerTitle : oldDrawer.drawerTitle),
            (req.body.creationDate != null && req.body.creationDate.length ? req.body.creationDate : oldDrawer.creationDate),
            (req.body.users_id != null && req.body.users_id.length ? req.body.users_id : oldDrawer.users_id),
            req.params.id
        ]);
        console.log(newUser);
        return newUser;
    });
}
function deleteDrawer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = pool.query('DELETE FROM drawer WHERE drawer_id=$1', [req.params.id]);
        console.log(user);
        return user;
    });
}
function addDrawer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var drawer = req.body;
        drawer.users_id = req.user.users_id;
        drawer.creationDate = new Date();
        const newDrawer = pool.query('INSERT INTO drawer (drawerTitle,creationDate, users_id) VALUES ($1,$2,$3) RETURNING *', [drawer.drawerTitle, drawer.creationDate, drawer.users_id]);
        return newDrawer;
    });
}
module.exports = {
    getDrawers,
    getDrawer,
    updateDrawer,
    deleteDrawer,
    addDrawer,
};
