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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pool = require("../../queries").pool;
const drawerFunctions = require("../drawer/drawerFunctions");
const HttpException_1 = __importDefault(require("../../exceptions/HttpException"));
function getEntries(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const entries = yield pool.query("SELECT * FROM drawerentries ORDER BY drawerentry_id ASC");
        return entries.rows;
    });
}
function getEntriesByDrawer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const entries = yield pool.query("SELECT * FROM drawerentries where drawer_id=$1 ORDER BY drawerentry_id ASC", [req.params.drawerid]);
        return entries.rows;
    });
}
function getSingleEntry(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pool.query("SELECT * FROM drawerentries WHERE drawerentry_id=$1", [req.params.id]);
        return result;
    });
}
function updateEntry(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let entry;
        if (req.entry) {
            entry = req.entry;
            req.params.id = req.entry.drawerentry_id;
        }
        else {
            entry = yield getSingleEntry(req, res, next);
        }
        if (!entry) {
            return next();
        }
        const newEntry = yield pool.query("UPDATE drawerentries SET selText=$1, comment=$2, imageURL=$3 WHERE drawerentry_id=$4", [
            req.body.selText != null && req.body.selText.length
                ? req.body.selText
                : entry.selText,
            req.body.comment != null && req.body.comment.length
                ? req.body.comment
                : entry.comment,
            req.body.imageURL != null && req.body.imageURL.length
                ? req.body.imageURL
                : entry.imageURL,
            req.params.id,
        ]);
        return newEntry;
    });
}
function deleteEntry(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.entry) {
            req.params.id = req.entry.drawerentry_id;
        }
        const entry = pool.query("DELETE FROM drawerentries WHERE drawerentry_id=$1", [req.params.id]);
        return entry;
    });
}
function addEntry(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var entry = req.body;
        entry.creationDate = new Date();
        const newEntry = pool.query("INSERT INTO drawerentries(comment, creationDate, imageURL, drawer_id, originURL, selText) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *", [
            entry.comment,
            entry.creationDate,
            entry.imageURL,
            entry.drawer_id,
            entry.originURL,
            entry.selText,
        ]);
        return newEntry;
    });
}
// middleware
function isAuthorOrAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.params.drawerid) {
            req.params.id = req.params.drawerid;
        }
        else if (req.body.drawer_id) {
            req.params.id = req.body.drawer_id;
        }
        else {
            let result = yield getSingleEntry(req, res, next);
            if (!result.rows.length) {
                return next(new HttpException_1.default(404, "Drawerentry not found"));
            }
            let entry = result.rows[0];
            req.entry = entry;
            req.params.id = entry.drawer_id;
        }
        let result = yield drawerFunctions.getSingleDrawer(req, res, next);
        if (!result.rows.length) {
            return next(new HttpException_1.default(404, "Drawer not found"));
        }
        let drawer = result.rows[0];
        if (!drawer || !req.user)
            return next();
        if (req.user.isadmin == true) {
            next();
        }
        else if (drawer.users_id == req.user.users_id) {
            next();
        }
        else {
            return res.status(403).send({
                message: "This function is only available for admins or the user of the drawer",
            });
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
    isAuthorOrAdmin,
};
