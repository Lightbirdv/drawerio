import axios from 'axios';
import Router from 'next/router';

export const isAdmin = () => {
    /* console.log(id) */
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +localStorage.getItem('token')
    }

    const {data} = axios.get(`http://localhost:5000/auth/isAdmin`,{
      headers: headers
    }
     ).then((response) => {
        console.log("hallo");
      })
    }