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
const { databasequery, tableuserquery, tabledrawerquery, tabledrawerentriesquery } = require("./database-jest.ts");
let masterclient = new pg.Client({
    host: "localhost",
    database: "postgres",
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: parseInt(process.env.PORT) || 5432,
});
let client = new pg.Client({
    host: "localhost",
    database: process.env.DBTEST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: parseInt(process.env.PORT) || 5432,
});
const execute = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield masterclient.connect();
        yield masterclient.query(databasequery);
        console.log("Database created successfully");
        yield masterclient.end();
        yield client.connect();
        yield client.query(tableuserquery);
        console.log("Table user created successfully");
        yield client.query(tabledrawerquery);
        console.log("Table drawer created successfully");
        yield client.query(tabledrawerentriesquery);
        console.log("Table drawerentry created successfully");
        yield client.end();
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
