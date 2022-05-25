import express from 'express'
const pool = require('../../queries').pool;
import { Drawer } from '../drawer/drawerFunctions';
const drawerFunctions = require('../drawer/drawerFunctions');

export interface Drawerentry {
    comment: string;
    imageURL: string[],
    drawer_id: number,
    creationDate: Date
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

async function getSingleEntry(req: express.Request, res: express.Response) {
  console.log("getsingleentry")
  const result = await pool.query('SELECT * FROM drawerentries WHERE drawerentry_id=$1',
    [req.params.id]
  );
  let entry: Drawerentry = {
    comment: result.rows[0].comment,
    imageURL: result.rows[0].imageurl,
    drawer_id: result.rows[0].drawer_id,
    creationDate: result.rows[0].creationdate
  }
  return entry
}

async function updateEntry(req: express.Request, res: express.Response) {
  const entry = await getSingleEntry(req, res)
  const newEntry = pool.query('UPDATE drawerentries SET drawer_id=$1, comment=$2, imageURL=$3, creationDate=$4  WHERE drawerentry_id=$5',
    [
        (req.body.comment != null && req.body.comment.length ? req.body.comment : entry.comment),
        (req.body.imageURL != null && req.body.imageURL.length ? req.body.imageURL : entry.imageURL),  
        (req.body.creationDate != null && req.body.creationDate.length ? req.body.creationDate : entry.creationDate), 
        (req.body.drawer_id != null && req.body.drawer_id.length ? req.body.drawer_id : entry.drawer_id), 
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
  const newEntry = pool.query('INSERT INTO drawerentries(comment, creationDate, imageURL, drawer_id) VALUES ($1,$2,$3,$4) RETURNING *',
    [entry.comment,entry.creationDate, entry.imageURL, entry.drawer_id]
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
    let entry: Drawerentry = await getSingleEntry(req, res);
    console.log(entry)
    req.entry = entry
    req.params.id = entry.drawer_id;
  }
  
  let drawer: Drawer = await drawerFunctions.getSingleDrawer(req, res)
  if(!drawer || !req.user) return res.sendStatus(401)
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