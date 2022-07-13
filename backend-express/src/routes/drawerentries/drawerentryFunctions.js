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
function getDrawerentriesByUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const drawerentries = yield pool.query("SELECT * FROM drawerentries INNER JOIN drawer ON drawerentries.drawer_id=drawer.drawer_id WHERE drawer.users_id=$1 ORDER BY drawerentry_id ASC", [req.user.users_id]);
        return drawerentries.rows;
    });
}
function searchDrawerentriesByUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let search = req.query.searchTerm;
        if (!search) {
            return getDrawerentriesByUser(req, res);
        }
        const entries = yield pool.query("SELECT * FROM drawerentries INNER JOIN drawer ON drawerentries.drawer_id=drawer.drawer_id WHERE drawer.users_id=$1 AND (drawerentries.comment ILIKE $2 OR drawerentries.selText ILIKE $2 OR drawerentries.originURL ILIKE $2) ORDER BY drawerentry_id ASC", [req.user.users_id, "%" + search + "%"]);
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
        let result;
        console.log(req.entry);
        if (req.entry) {
            entry = req.entry;
            req.params.id = req.entry.drawerentry_id;
        }
        else {
            result = yield getSingleEntry(req, res, next);
            if (!result.rows.length) {
                return next(new HttpException_1.default(404, "Drawerentry not found"));
            }
            entry = result.rows[0];
        }
        const newEntry = yield pool.query("UPDATE drawerentries SET selText=$1, comment=$2, imageURL=$3, videoURL=$4, websiteContent=$5 WHERE drawerentry_id=$6", [
            req.body.selText != null && req.body.selText.length ? req.body.selText : entry.selText,
            req.body.comment != null && req.body.comment.length ? req.body.comment : entry.comment,
            req.body.imageURL != null && req.body.imageURL.length ? req.body.imageURL : entry.imageURL,
            req.body.videoURL != null && req.body.videoURL.length ? req.body.videoURL : entry.videoURL,
            req.body.websiteContent != null && req.body.websiteContent.length ? req.body.websiteContent : entry.websiteContent,
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
        const newEntry = pool.query("INSERT INTO drawerentries(comment, creationDate, imageURL, videoURL, websiteContent, drawer_id, originURL, selText) VALUES ($1,$2,$3,$4,$5,$6,$7, $8) RETURNING *", [entry.comment, entry.creationDate, entry.imageURL, entry.videoURL, entry.websiteContent, entry.drawer_id, entry.originURL, entry.selText]);
        return newEntry;
    });
}
function searchDrawerentries(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let { drawer, searchTerm } = req.query;
        const searchedDrawer = yield pool.query("SELECT users_id FROM drawer WHERE drawer_id=$1", [drawer]);
        console.log(searchedDrawer);
        console.log(req.user.users_id);
        if (!searchedDrawer.rows.length) {
            return next(new HttpException_1.default(404, "Drawer not found"));
        }
        if (searchedDrawer.rows[0].users_id != req.user.users_id) {
            return next(new HttpException_1.default(403, "You are not the author of this drawer"));
        }
        if (!searchTerm) {
            req.params.drawerid = drawer;
            return yield getEntriesByDrawer(req, res);
        }
        const searchResult = yield pool.query("SELECT * FROM drawerentries WHERE drawer_id=$1 AND (comment ILIKE $2 OR selText ILIKE $2 OR originURL ILIKE $2)", [drawer, "%" + searchTerm + "%"]);
        return searchResult.rows;
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
    getDrawerentriesByUser,
    getSingleEntry,
    updateEntry,
    deleteEntry,
    addEntry,
    searchDrawerentries,
    searchDrawerentriesByUser,
    isAuthorOrAdmin,
};
