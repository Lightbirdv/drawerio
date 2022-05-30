import axios from 'axios';
import Router from 'next/router';

export const entryDelete = (id) => {
  console.log("deleteEntry = " + id)
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +localStorage.getItem('token')
    }

    const {data} = axios.delete(`http://localhost:5000/drawerentry/${id}`,{
      headers: headers
    }
     ).then((response) => {
        console.log(response.status);
      })
    }