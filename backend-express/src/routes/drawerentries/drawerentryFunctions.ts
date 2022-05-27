import express from 'express'
const pool = require('../../queries').pool;
import { Drawer } from '../drawer/drawerFunctions';
const drawerFunctions = require('../drawer/drawerFunctions');
import HttpException from '../../exceptions/HttpException';
import { debug } from 'console';

export interface Drawerentry {
   drawerentry_id: number,
    comment: string;
    imageURL: string[],
    drawer_id: number,
    creationDate: Date,
    originURL: string,
    selText: string,
}

async function getEntries(req: express.Request, res: express.Response) {
    const entries = await pool.query('SELECT * FROM drawerentries ORDER BY drawerentry_id ASC');
    return entries.rows
}

async function getEntriesByDrawer(req: express.Request, res: express.Response) {
  const entries = await pool.query('SELECT * FROM drawerentries where drawer_id=$1 ORDER BY drawerentry_id ASC',
    [req.params.drawerid]
  );
  return entries.rows
}

async function getSingleEntry(req: express.Request, res: express.Response, next: express.NextFunction) {
  const result = await pool.query('SELECT * FROM drawerentries WHERE drawerentry_id=$1',
    [req.params.id]
  );
  if(result.rowCount == 0) {
    return next(new HttpException(404, 'Drawerentry not found'));
  } 
  let entry: Drawerentry = {
    drawerentry_id: result.rows[0].drawerentry_id,
    comment: result.rows[0].comment,
    imageURL: result.rows[0].imageurl,
    drawer_id: result.rows[0].drawer_id,
    creationDate: result.rows[0].creationdate,
    originURL: result.rows[0].originurl,
    selText: result.rows[0].seltext
  }
  return entry
}

async function updateEntry(req: any, res: express.Response, next: express.NextFunction) {
  let entry: Drawerentry | void;
  if(req.entry) {
    entry = req.entry
    req.params.id = req.entry.drawerentry_id
  } else {
    entry = await getSingleEntry(req, res, next)
  }
  if(!entry) {
    return next()
  }
  const newEntry = await pool.query('UPDATE drawerentries SET selText=$1, comment=$2, imageURL=$3 WHERE drawerentry_id=$4',
    [
      (req.body.selText != null && req.body.selText.length ? req.body.selText : entry.selText),
      (req.body.comment != null && req.body.comment.length ? req.body.comment : entry.comment),
      (req.body.imageURL != null && req.body.imageURL.length ? req.body.imageURL : entry.imageURL),  
      req.params.id
    ]
  );
  return newEntry
}

async function deleteEntry(req: express.Request, res: express.Response) {
  const entry = pool.query('DELETE FROM drawerentries WHERE drawerentry_id=$1',
    [req.params.id]
  );
  return entry
}

async function addEntry(req: express.Request, res: express.Response) {
  var entry: Drawerentry = req.body;
  entry.creationDate = new Date();
  const newEntry = pool.query('INSERT INTO drawerentries(comment, creationDate, imageURL, drawer_id, originURL, selText) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
    [entry.comment,entry.creationDate, entry.imageURL, entry.drawer_id, entry.originURL, entry.selText]
  );
  return newEntry
}

async function isAuthorOrAdmin(req: any, res: express.Response, next:express.NextFunction) {
  if(req.params.drawerid) {
    req.params.id = req.params.drawerid;
  } else if(req.body.drawer_id) {
    req.params.id = req.body.drawer_id;
  }
  else {
    let entry: Drawerentry | void = await getSingleEntry(req, res, next);
    if(!entry) {
      return next()
    }
    req.entry = entry
    req.params.id = entry.drawer_id;
  }
  
  let drawer: Drawer | void = await drawerFunctions.getSingleDrawer(req, res, next)
  if(!drawer || !req.user) return next()
  if(req.user.isadmin == true){
    next()
  } else if( drawer.users_id == req.user.users_id) { 
    next()
  } else {
    return res.status(403).send ({ message : 'This function is only available for admins or the user of the drawer' })
  }
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