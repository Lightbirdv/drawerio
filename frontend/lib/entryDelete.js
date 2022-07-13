import axios from 'axios';
import Router from 'next/router';

export const entryDelete = (id) => {
  console.log("deleteEntry = " + id)
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +localStorage.getItem('token')
    }

    const {data} = axios.delete(process.env.NEXT_PUBLIC_API_URL+process.env.NEXT_PUBLIC_API_PORT+`drawerentry/${id}`,{
      headers: headers
    }
     ).then((response) => {
        console.log(response.status);
      })
    }