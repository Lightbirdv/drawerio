import axios from 'axios';
import Router from 'next/router';
import { Component } from 'react';
import { logify } from '../components/LoginComponent';
import { getname } from '../lib/getname';




export const loginUser = (email, password) => {
  console.log(email, password)
  const { data } = axios.post(process.env.NEXT_PUBLIC_API_URL+process.env.NEXT_PUBLIC_API_PORT+'auth/login', { email: email, password: password }).then((response) => {
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
        Router.push(`/adminpage?title=${"drawers"}`)
      } else if (response.data.user.isadmin === false/*  && response.data.user.enabled === true */) {
        getname(email);
        Router.push("/drawers")
      }
      else {
        logify("Unfortunately you could not log in");
      }
    } 
    else {
      logify("Unfortunately you could not log in");
    }
  }).catch(e => {
    logify("Unfortunately you could not log in");
  }); 
};

