import axios from 'axios';
import Router from 'next/router';
import { Component } from 'react';
import { getname } from '../lib/getname';

export const loginUser = (email, password) => {
  console.log(email, password)
  const { data } = axios.post('http://localhost:5000/auth/login', { email: email, password: password }).then((response) => {
    console.log(response.data.user.isadmin + ", " + response.data.user.enabled);
    if (response.status === 200 && email !== "" && password !== "") {
      const token = localStorage.setItem("token", response.data.token);
      const x = localStorage.setItem("emailx", email);
      const user = getname(email);

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }

      if (response.data.user.isadmin === true /* && response.data.user.enabled === true */) { 
        Router.push("/adminpage")
      } else if (response.data.user.isadmin === false/*  && response.data.user.enabled === true */) {
        getname(email);
        Router.push("/privatepage")
      }
      else {
        alert("Unfortunately you could not logx in")
      }
    } 
    else {
      alert("Unfortunately you could not logy in")
    }
  }).catch(e => {
    alert("Unfortunately you could not logz in")
  }); 
};

