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
const drawerFunctions = require('../drawer/drawerFunctions');
function getEntries(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const entries = yield pool.query('SELECT * FROM drawerentries ORDER BY drawerentry_id ASC');
        return entries.rows;
    });
}
function getEntriesByDrawer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const entries = yield pool.query('SELECT * FROM drawerentries where drawer_id=$1 ORDER BY drawerentry_id ASC', [req.params.drawerid]);
        return entries.rows;
    });
}
function getSingleEntry(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("getsingleentry");
        const result = yield pool.query('SELECT * FROM drawerentries WHERE drawerentry_id=$1', [req.params.id]);
        let entry = {
            comment: result.rows[0].comment,
            imageURL: result.rows[0].imageurl,
            drawer_id: result.rows[0].drawer_id,
            creationDate: result.rows[0].creationdate
        };
        return entry;
    });
}
function updateEntry(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const entry = yield getSingleEntry(req, res);
        const newEntry = pool.query('UPDATE drawerentries SET drawer_id=$1, comment=$2, imageURL=$3, creationDate=$4  WHERE drawerentry_id=$5', [
            (req.body.comment != null && req.body.comment.length ? req.body.comment : entry.comment),
            (req.body.imageURL != null && req.body.imageURL.length ? req.body.imageURL : entry.imageURL),
            (req.body.creationDate != null && req.body.creationDate.length ? req.body.creationDate : entry.creationDate),
            (req.body.drawer_id != null && req.body.drawer_id.length ? req.body.drawer_id : entry.drawer_id),
            req.params.id
        ]);
        return newEntry;
    });
}
function deleteEntry(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const entry = pool.query('DELETE FROM drawerentries WHERE drawerentry_id=$1', [req.params.id]);
        return entry;
    });
}
function addEntry(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var entry = req.body;
        entry.creationDate = new Date();
        const newEntry = pool.query('INSERT INTO drawerentries(comment, creationDate, imageURL, drawer_id) VALUES ($1,$2,$3,$4) RETURNING *', [entry.comment, entry.creationDate, entry.imageURL, entry.drawer_id]);
        return newEntry;
    });
}
function isAuthorOrAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.params.drawerid) {
            req.params.id = req.params.drawerid;
        }
        else if (req.body.drawer_id) {
            req.params.id = req.body.drawer_id;
        }
        else {
            let entry = yield getSingleEntry(req, res);
            console.log(entry);
            req.entry = entry;
            req.params.id = entry.drawer_id;
        }
        let drawer = yield drawerFunctions.getSingleDrawer(req, res);
        if (!drawer || !req.user)
            return res.sendStatus(401);
        if (req.user.isadmin == true) {
            next();
        }
        else if (drawer.users_id == req.user.users_id) {
            next();
        }
        else {
            return res.status(403).send({ message: 'This function is only available for admins or the user of the drawer' });
        }
    });
}
module.exports = {
    getEntries,
    getEntriesByDrawer,
    getSingleEntry,
    updateEntry,
    deleteEntry,
    addEntry,
    isAuthorOrAdmin
};
