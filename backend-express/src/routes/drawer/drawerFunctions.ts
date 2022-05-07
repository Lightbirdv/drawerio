import express from 'express'
const pool = require('../../queries').pool;

interface Drawer {
    drawerTitle: string;
    creationDate: Date,
    drawerLogo: string,
    users_id: number,
}

async function getDrawers(req:any, res:any) {
    const drawers = pool.query('SELECT * FROM drawer ORDER BY drawer_id ASC');
    console.log(drawers)
    return drawers
}

async function getDrawer(req:any, res:any) {
  const drawer = pool.query('SELECT * FROM drawer WHERE drawer_id=$1',
    [req.params.id]
  );
  console.log(drawer)
  return drawer
}

async function updateDrawer(req:any, res:any) {
  const drawer = await getDrawer(req, res)
  let oldDrawer = { 
      drawer_id: drawer.rows[0].drawer_id, 
      drawerTitle: drawer.rows[0].drawerTitle, 
      creationDate: drawer.rows[0].creationDate,
      users_id: drawer.rows[0].users_id
    }
  const newUser = pool.query('UPDATE drawer SET drawer_id=$1, drawerTitle=$2, creationDate=$3, users_id=$4  WHERE drawer_id=$5',
    [
        (req.body.drawer_id != null && req.body.drawer_id.length ? req.body.drawer_id : oldDrawer.drawer_id),
        (req.body.drawerTitle != null && req.body.drawerTitle.length ? req.body.drawerTitle : oldDrawer.drawerTitle),  
        (req.body.creationDate != null && req.body.creationDate.length ? req.body.creationDate : oldDrawer.creationDate), 
        (req.body.users_id != null && req.body.users_id.length ? req.body.users_id : oldDrawer.users_id), 
        req.params.id
    ]
  );
  console.log(newUser)
  return newUser
}

async function deleteDrawer(req:any, res:any) {
  const user = pool.query('DELETE FROM drawer WHERE drawer_id=$1',
    [req.params.id]
  );
  console.log(user)
  return user
}

async function addDrawer(req: any, res: any) {
  var drawer: Drawer = req.body;
  drawer.users_id = req.user.users_id
  drawer.creationDate = new Date();
  const newDrawer = pool.query('INSERT INTO drawer (drawerTitle,creationDate, users_id) VALUES ($1,$2,$3) RETURNING *',
    [drawer.drawerTitle,drawer.creationDate, drawer.users_id]
  );
  return newDrawer
}

module.exports = {
    getDrawers,
    getDrawer,
    updateDrawer,
    deleteDrawer,
    addDrawer,
};