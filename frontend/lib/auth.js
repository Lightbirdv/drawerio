import axios from 'axios';
import Router from 'next/router';
import { Component } from 'react';
import { getname } from '../lib/getname';

export const loginUser = (email, password) => {
  console.log(email, password)
   
  const { data } = axios.post('http://localhost:5000/auth/login', { email: email, password: password }).then((response) => {
    console.log(response);
    if (response.status === 200 && email !== "" && password !== "") {
      const token = localStorage.setItem("token", response.data);
      const x = localStorage.setItem("emailx", email);
      const user = getname(email);

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }


      const { adm } = axios.get(`http://localhost:5000/auth/isAdmin`, {
        headers: headers
      }
      ).then((response) => {

        if (response.data.isadmin === true) {
          
          Router.push("/adminpage")
        } else if (response.data.isadmin === false) {
         /*  getname(email); */
          Router.push("/privatepage")
        }
      })

    }
    else {
      alert("Unfortunately you could not log in")
    }
  }).catch(e => {
    alert("Unfortunately you could not log in")
  });
}
