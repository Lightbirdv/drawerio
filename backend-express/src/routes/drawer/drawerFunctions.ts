import express from "express";
const pool = require("../../queries").pool;
const jwt = require("jsonwebtoken");
import HttpException from "../../exceptions/HttpException";
import { Drawer } from "./drawer";

async function getDrawers() {
	const drawers = await pool.query("SELECT * FROM drawer ORDER BY drawer_id ASC");
	return drawers.rows;
}

async function getDrawersByUser(req: any, res: express.Response) {
	const drawers = await pool.query("SELECT * FROM drawer where users_id=$1 ORDER BY drawer_id ASC", [req.user.users_id]);
	return drawers.rows;
}

async function getSingleDrawer(req: express.Request, res: express.Response, next: express.NextFunction) {
	const result = await pool.query("SELECT * FROM drawer WHERE drawer_id=$1", [req.params.id]);
	return result;
}

async function updateDrawer(req: express.Request, res: express.Response, next: express.NextFunction) {
	if (!req.drawer) {
		return next(new HttpException(404, "UpdateDrawer: Error in middle ware"));
	}
	console.log(req.drawer);
	const newDrawer = pool.query("UPDATE drawer SET drawer_id=$1, drawerTitle=$2, creationDate=$3, users_id=$4  WHERE drawer_id=$5", [
		req.body.drawer_id != null && req.body.drawer_id.length ? req.body.drawer_id : req.drawer.drawer_id,
		req.body.drawerTitle != null && req.body.drawerTitle.length ? req.body.drawerTitle : req.drawer.drawertitle,
		req.body.creationDate != null && req.body.creationDate.length ? req.body.creationDate : req.drawer.creationdate,
		req.body.users_id != null && req.body.users_id.length ? req.body.users_id : req.drawer.users_id,
		req.params.id,
	]);
	return newDrawer;
}

async function deleteDrawer(req: express.Request, res: express.Response) {
	const drawer = pool.query("DELETE FROM drawer WHERE drawer_id=$1", [req.params.id]);
	return drawer;
}

async function addDrawer(req: any, res: express.Response) {
	var drawer: Drawer = req.body;
	drawer.users_id = req.user.users_id;
	drawer.creationDate = new Date();
	let newDrawer = pool.query("INSERT INTO drawer (drawerTitle,creationDate, users_id) VALUES ($1,$2,$3)   RETURNING *", [
		drawer.drawerTitle,
		drawer.creationDate,
		drawer.users_id,
	]);
	return newDrawer;
}

async function addDefaultDrawer(users_id: number) {
	const newDrawer = pool.query("INSERT INTO drawer (drawerTitle,creationDate, users_id) VALUES ($1,$2,$3) RETURNING *", [
		"My first Drawer!",
		new Date(),
		users_id,
	]);
	return newDrawer;
}

// middleware

async function isAuthorOrAdmin(req: any, res: express.Response, next: express.NextFunction) {
	let result = await getSingleDrawer(req, res, next);
	if (!result.rows.length) {
		return next(new HttpException(404, "No drawer found"));
	}
	let drawer: Drawer = result.rows[0];

	if (!req.user) {
		return next(new HttpException(404, "No request user"));
	}
	req.drawer = drawer;

	if (req.user.isadmin == true || drawer.users_id == req.user.users_id) {
		next();
	} else {
		return res.status(500).send({
			message: "This function is only available for admins or the user of the drawer",
		});
	}
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
