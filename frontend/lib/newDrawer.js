import axios from 'axios';
import Router from 'next/router';

export const addDrawer = (token, drawerName) => {
    console.log(drawerName)

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +token
      }

    const {data} = axios.post('http://localhost:5000/drawer/add', {drawerTitle: drawerName},{
        headers: headers
      }).then((response) => {
        console.log(response);
      })
    }

    