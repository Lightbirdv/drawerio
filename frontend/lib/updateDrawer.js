import axios from 'axios';
import Router from 'next/router';

export const updateDrawer = (newName, dime, userID , id) => {
    console.log(newName, dime, userID , id)

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +localStorage.getItem('token')
    }


    const {data} = axios.patch('http://localhost:5000/drawer/'+id,
     {
    drawerTitle: newName,
    creationDate: dime,
    users_id: userID
    },{
      headers: headers
    }).then((response) => {
        console.log(response);
      })
    }