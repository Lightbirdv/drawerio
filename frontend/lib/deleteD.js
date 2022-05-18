import axios from 'axios';
import Router from 'next/router';

export const deleteD = (id) => {
    console.log(id)
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +localStorage.getItem('token')
    }

    const {data} = axios.delete(`http://localhost:5000/drawer/${id}`,{
      headers: headers
    }
     ).then((response) => {
        console.log(response.status);
      })
    }