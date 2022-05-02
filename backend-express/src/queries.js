"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _dbsecret_json_1 = __importDefault(require("../.dbsecret.json"));
const Pool = require('pg').Pool;
const pool = new Pool({
    user: _dbsecret_json_1.default.user,
    password: _dbsecret_json_1.default.password,
    host: _dbsecret_json_1.default.host,
    database: _dbsecret_json_1.default.database,
    port: _dbsecret_json_1.default.port
});
module.exports = {
    pool
};
