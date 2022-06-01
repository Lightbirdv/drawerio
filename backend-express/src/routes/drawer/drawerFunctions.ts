import express from 'express'
const pool = require('../../queries').pool;
const jwt = require('jsonwebtoken')
import HttpException from '../../exceptions/HttpException'

export interface Drawer {
    drawer_id: number;
    drawerTitle: string;
    creationDate: Date,
    drawerLogo: string,
    users_id: number,
}

async function getDrawers(req: express.Request, res: express.Response) {
    const drawers = await pool.query('SELECT * FROM drawer ORDER BY drawer_id ASC');
    return drawers.rows
}

async function getDrawersByUser(req: any, res: express.Response) {
  const drawers = await pool.query('SELECT * FROM drawer where users_id=$1 ORDER BY drawer_id ASC',
    [req.user.users_id]
  );
  return drawers.rows
}

async function getSingleDrawer(req: express.Request, res: express.Response, next:express.NextFunction) {
  const result = await pool.query('SELECT * FROM drawer WHERE drawer_id=$1',
    [req.params.id]
  );
  if(result.rowCount == 0) {
    return next(new HttpException(404, 'Drawer not found'));
  } 
  let drawer: Drawer = {
    drawer_id: result.rows[0].drawer_id,
    drawerTitle: result.rows[0].drawertitle,
    creationDate: result.rows[0].creationdate,
    drawerLogo: result.rows[0].drawerlogo,
    users_id: result.rows[0].users_id,
  }
  return drawer
}

async function updateDrawer(req: express.Request, res: express.Response, next:express.NextFunction) {
  const drawer : Drawer | void = await getSingleDrawer(req, res, next)
  if (!drawer) {
    return next()
  }
  const newUser = pool.query('UPDATE drawer SET drawer_id=$1, drawerTitle=$2, creationDate=$3, users_id=$4  WHERE drawer_id=$5',
    [
        (req.body.drawer_id != null && req.body.drawer_id.length ? req.body.drawer_id : drawer.drawer_id),
        (req.body.drawerTitle != null && req.body.drawerTitle.length ? req.body.drawerTitle : drawer.drawerTitle),  
        (req.body.creationDate != null && req.body.creationDate.length ? req.body.creationDate : drawer.creationDate), 
        (req.body.users_id != null && req.body.users_id.length ? req.body.users_id : drawer.users_id), 
        req.params.id
    ]
  );
  return newUser
}

async function deleteDrawer(req: express.Request, res: express.Response) {
  const user = pool.query('DELETE FROM drawer WHERE drawer_id=$1',
    [req.params.id]
  );
  return user
}

async function addDrawer(req: any, res: express.Response) {
  var drawer: Drawer = req.body;
  drawer.users_id = req.user.users_id
  drawer.creationDate = new Date();
  let newDrawer = pool.query('INSERT INTO drawer (drawerTitle,creationDate, users_id) VALUES ($1,$2,$3)   RETURNING *',
    [drawer.drawerTitle,drawer.creationDate, drawer.users_id]
  );
  return newDrawer
}

async function addDefaultDrawer(users_id: number) {
  const newDrawer = pool.query('INSERT INTO drawer (drawerTitle,creationDate, users_id) VALUES ($1,$2,$3) RETURNING *',
    ["My first Drawer!", new Date(), users_id]
  );
  return newDrawer
}

async function isAuthorOrAdmin(req: any, res: express.Response, next:express.NextFunction) {
  let drawer: Drawer | void = await getSingleDrawer(req, res, next)
  if (!drawer) {
    return next()
  }
  if(!req.user) {
     return next(new HttpException(404, 'No request user'));
  } 
  req.drawer = drawer;
  if(req.user.isadmin == true || drawer.users_id == req.user.users_id){
    next()
  } else {
    return res.status(500).send ({ message : 'This function is only available for admins or the user of the drawer' })
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