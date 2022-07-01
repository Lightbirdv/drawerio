"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const pg = __importStar(require("pg"));
require("dotenv").config();
const bcrypt = require("bcrypt");
let client = new pg.Client({
    host: "localhost",
    database: process.env.DB,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: parseInt(process.env.PORT) || 5432,
});
const execute = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        let firstuser = yield client.query(`INSERT INTO users (email,password,isAdmin,enabled) VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING`, [
            "seedtestadminuser",
            yield bcrypt.hash("seedtestadminpassword", 10),
            "true",
            true,
        ]);
        console.log("Testadminuser created successfully");
        let seconduser = yield client.query(`INSERT INTO users (email,password,enabled) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING`, [
            "seedtestuser",
            yield bcrypt.hash("seedtestpassword", 10),
            true,
        ]);
        console.log("Testuser created successfully");
        let firstdrawer = yield client.query("INSERT INTO drawer (drawerTitle, creationDate, users_id) VALUES ($1,$2,$3)   RETURNING *", [
            "testdrawer for adminuser",
            new Date(),
            1,
        ]);
        console.log("First drawer created successfully");
        let seconddrawer = yield client.query("INSERT INTO drawer (drawerTitle, creationDate, users_id) VALUES ($1,$2,$3)   RETURNING *", [
            "testdrawer for seeduser",
            new Date(),
            2,
        ]);
        yield client.query("INSERT INTO drawerentries(comment, creationDate, imageURL, drawer_id, originURL, selText) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *", [
            "drawerentry for adminuser",
            new Date(),
            ["https://i.imgur.com/R8se5g1b.jpg", "https://i.imgur.com/JXetxQhb.jpg"],
            1,
            "https://seedaddress.com",
            "lorem ipsum dolor sit amet",
        ]);
        console.log("Table drawerentry created successfully");
        yield client.query("INSERT INTO drawerentries(comment, creationDate, imageURL, drawer_id, originURL, selText) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *", [
            "drawerentry for seeduser",
            new Date(),
            ["https://i.imgur.com/2bvab7yb.jpg", "https://i.imgur.com/icsm6L3b.jpg"],
            2,
            "https://seedaddress.com",
            "lorem ipsum dolor sit amet",
        ]);
        return true;
    }
    catch (err) {
        console.log(err);
    }
    finally {
        yield client.end();
    }
});
execute().then((result) => {
    if (result) {
        console.log("Job successfully completed");
    }
});
