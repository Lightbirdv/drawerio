import axios from 'axios';
import Router from 'next/router';

export const isAdmin = () => {
    /* console.log(id) */
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +localStorage.getItem('token')
    }

    const {data} = axios.get(process.env.NEXT_PUBLIC_API_URL+process.env.NEXT_PUBLIC_API_PORT+`auth/isAdmin`,{
      headers: headers
    }
     ).then((response) => {
        console.log("hallo");
      })
    }