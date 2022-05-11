import axios from 'axios';
import Router from 'next/router';

export const loginUser = (email,password) => {
    console.log(email , password)
    const {data} = axios.post('http://localhost:5000/auth/login', {email: email, password: password}).then((response) => {
        console.log(response.status);
        if (response !== null) {
          localStorage.setItem("token", response);
          Router.push("/privatepage")
        }
        else {
         alert("Unfortunately, your information is incorrect")
        }
      })
    }