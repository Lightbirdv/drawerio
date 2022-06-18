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
const jwt = require("jsonwebtoken");
const HttpException_1 = __importDefault(require("../../exceptions/HttpException"));
function getDrawers() {
    return __awaiter(this, void 0, void 0, function* () {
        const drawers = yield pool.query("SELECT * FROM drawer ORDER BY drawer_id ASC");
        return drawers.rows;
    });
}
function getDrawersByUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const drawers = yield pool.query("SELECT * FROM drawer where users_id=$1 ORDER BY drawer_id ASC", [req.user.users_id]);
        return drawers.rows;
    });
}
function getSingleDrawer(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pool.query("SELECT * FROM drawer WHERE drawer_id=$1", [
            req.params.id,
        ]);
        return result;
    });
}
function updateDrawer(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.drawer) {
            return next(new HttpException_1.default(404, "UpdateDrawer: Error in middle ware"));
        }
        console.log(req.drawer);
        const newDrawer = pool.query("UPDATE drawer SET drawer_id=$1, drawerTitle=$2, creationDate=$3, users_id=$4  WHERE drawer_id=$5", [
            req.body.drawer_id != null && req.body.drawer_id.length
                ? req.body.drawer_id
                : req.drawer.drawer_id,
            req.body.drawerTitle != null && req.body.drawerTitle.length
                ? req.body.drawerTitle
                : req.drawer.drawertitle,
            req.body.creationDate != null && req.body.creationDate.length
                ? req.body.creationDate
                : req.drawer.creationdate,
            req.body.users_id != null && req.body.users_id.length
                ? req.body.users_id
                : req.drawer.users_id,
            req.params.id,
        ]);
        return newDrawer;
    });
}
function deleteDrawer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const drawer = pool.query("DELETE FROM drawer WHERE drawer_id=$1", [
            req.params.id,
        ]);
        return drawer;
    });
}
function addDrawer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var drawer = req.body;
        drawer.users_id = req.user.users_id;
        drawer.creationDate = new Date();
        let newDrawer = pool.query("INSERT INTO drawer (drawerTitle,creationDate, users_id) VALUES ($1,$2,$3)   RETURNING *", [drawer.drawerTitle, drawer.creationDate, drawer.users_id]);
        return newDrawer;
    });
}
function addDefaultDrawer(users_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const newDrawer = pool.query("INSERT INTO drawer (drawerTitle,creationDate, users_id) VALUES ($1,$2,$3) RETURNING *", ["My first Drawer!", new Date(), users_id]);
        return newDrawer;
    });
}
// middleware
function isAuthorOrAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield getSingleDrawer(req, res, next);
        if (!result.rows.length) {
            return next(new HttpException_1.default(404, "No drawer found"));
        }
        let drawer = result.rows[0];
        if (!req.user) {
            return next(new HttpException_1.default(404, "No request user"));
        }
        req.drawer = drawer;
        if (req.user.isadmin == true || drawer.users_id == req.user.users_id) {
            next();
        }
        else {
            return res
                .status(500)
                .send({
                message: "This function is only available for admins or the user of the drawer",
            });
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
