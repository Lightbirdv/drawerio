import express from "express";
const pool = require("../../queries").pool;
import { Drawer } from "../drawer/drawer";
const drawerFunctions = require("../drawer/drawerFunctions");
import HttpException from "../../exceptions/HttpException";
import { Drawerentry } from "./drawerentry";

async function getEntries(req: express.Request, res: express.Response) {
	const entries = await pool.query("SELECT * FROM drawerentries ORDER BY drawerentry_id ASC");
	return entries.rows;
}

async function getEntriesByDrawer(req: express.Request, res: express.Response) {
	const entries = await pool.query("SELECT * FROM drawerentries where drawer_id=$1 ORDER BY drawerentry_id ASC", [req.params.drawerid]);
	return entries.rows;
}


async function getDrawerentriesByUser(req: any, res: express.Response) {
	const drawerentries = await pool.query("SELECT * FROM drawerentries INNER JOIN drawer ON drawerentries.drawer_id=drawer.drawer_id WHERE drawer.users_id=$1 ORDER BY drawerentry_id ASC", [req.user.users_id]);
	return drawerentries.rows;
}

async function getSingleEntry(req: express.Request, res: express.Response, next: express.NextFunction) {
	const result = await pool.query("SELECT * FROM drawerentries WHERE drawerentry_id=$1", [req.params.id]);

	return result;
}

async function updateEntry(req: any, res: express.Response, next: express.NextFunction) {
	let entry: Drawerentry;
	let result;
	console.log(req.entry);
	if (req.entry) {
		entry = req.entry;
		req.params.id = req.entry.drawerentry_id;
	} else {
		result = await getSingleEntry(req, res, next);
		if (!result.rows.length) {
			return next(new HttpException(404, "Drawerentry not found"));
		}
		entry = result.rows[0];
	}

	const newEntry = await pool.query("UPDATE drawerentries SET selText=$1, comment=$2, imageURL=$3, videoURL=$4 WHERE drawerentry_id=$5", [
		req.body.selText != null && req.body.selText.length ? req.body.selText : entry.selText,
		req.body.comment != null && req.body.comment.length ? req.body.comment : entry.comment,
		req.body.imageURL != null && req.body.imageURL.length ? req.body.imageURL : entry.imageURL,
		req.body.videoURL != null && req.body.videoURL.length ? req.body.videoURL : entry.videoURL,
		req.params.id,
	]);
	return newEntry;
}

async function deleteEntry(req: any, res: express.Response) {
	if (req.entry) {
		req.params.id = req.entry.drawerentry_id;
	}
	const entry = pool.query("DELETE FROM drawerentries WHERE drawerentry_id=$1", [req.params.id]);
	return entry;
}

async function addEntry(req: express.Request, res: express.Response) {
	var entry: Drawerentry = req.body;
	entry.creationDate = new Date();
	const newEntry = pool.query(
		"INSERT INTO drawerentries(comment, creationDate, imageURL, videoURL, drawer_id, originURL, selText) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
		[entry.comment, entry.creationDate, entry.imageURL, entry.videoURL, entry.drawer_id, entry.originURL, entry.selText]
	);
	return newEntry;
}

// middleware

async function isAuthorOrAdmin(req: any, res: express.Response, next: express.NextFunction) {
	if (req.params.drawerid) {
		req.params.id = req.params.drawerid;
	} else if (req.body.drawer_id) {
		req.params.id = req.body.drawer_id;
	} else {
		let result = await getSingleEntry(req, res, next);
		if (!result.rows.length) {
			return next(new HttpException(404, "Drawerentry not found"));
		}
		let entry: Drawerentry = result.rows[0];
		req.entry = entry;
		req.params.id = entry.drawer_id;
	}

	let result: any = await drawerFunctions.getSingleDrawer(req, res, next);
	if (!result.rows.length) {
		return next(new HttpException(404, "Drawer not found"));
	}
	let drawer: Drawer = result.rows[0];
	if (!drawer || !req.user) return next();
	if (req.user.isadmin == true) {
		next();
	} else if (drawer.users_id == req.user.users_id) {
		next();
	} else {
		return res.status(403).send({
			message: "This function is only available for admins or the user of the drawer",
		});
	}
}

module.exports = {
	getEntries,
	getEntriesByDrawer,
	getDrawerentriesByUser,
	getSingleEntry,
	updateEntry,
	deleteEntry,
	addEntry,
	isAuthorOrAdmin,
};
