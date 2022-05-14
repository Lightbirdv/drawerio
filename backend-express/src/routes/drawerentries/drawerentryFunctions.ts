import express from 'express'
const pool = require('../../queries').pool;

interface Drawerentry {
    comment: string;
    imageURL: string[],
    drawer_id: number,
    creationDate: Date
}

async function getEntries(req:any, res:any) {
    const entries = pool.query('SELECT * FROM drawerentries ORDER BY drawerentry_id ASC');
    return entries
}

async function getEntriesByDrawer(req:any, res:any) {
  const entries = pool.query('SELECT * FROM drawerentries where drawer_id=$1 ORDER BY drawerentry_id ASC',
    [req.params.drawerid]
  );
  return entries
}

async function getSingleEntry(req:any, res:any) {
  const entry = pool.query('SELECT * FROM drawerentries WHERE drawerentry_id=$1',
    [req.params.id]
  );
  return entry
}

async function updateEntry(req:any, res:any) {
  const entry = await getSingleEntry(req, res)
  let oldEntry = { 
      comment: entry.rows[0].comment, 
      imageURL: entry.rows[0].imageURL,
      creationDate: entry.rows[0].creationDate,
      drawer_id: entry.rows[0].drawer_id
    }
  const newEntry = pool.query('UPDATE drawerentries SET drawer_id=$1, comment=$2, imageURL=$3, creationDate=$4  WHERE drawerentry_id=$5',
    [
        (req.body.comment != null && req.body.comment.length ? req.body.comment : oldEntry.comment),
        (req.body.imageURL != null && req.body.imageURL.length ? req.body.imageURL : oldEntry.imageURL),  
        (req.body.creationDate != null && req.body.creationDate.length ? req.body.creationDate : oldEntry.creationDate), 
        (req.body.drawer_id != null && req.body.drawer_id.length ? req.body.drawer_id : oldEntry.drawer_id), 
        req.params.id
    ]
  );
  return newEntry
}

async function deleteEntry(req:any, res:any) {
  const entry = pool.query('DELETE FROM drawerentries WHERE drawerentry_id=$1',
    [req.params.id]
  );
  return entry
}

async function addEntry(req: any, res: any) {
  var entry: Drawerentry = req.body;
  console.log(entry)
  entry.creationDate = new Date();
  const newEntry = pool.query('INSERT INTO drawerentries(comment, creationDate, imageURL, drawer_id) VALUES ($1,$2,$3,$4) RETURNING *',
    [entry.comment,entry.creationDate, entry.imageURL, entry.drawer_id]
  );
  return newEntry
}

module.exports = {
    getEntries,
    getEntriesByDrawer,
    getSingleEntry,
    updateEntry,
    deleteEntry,
    addEntry
};