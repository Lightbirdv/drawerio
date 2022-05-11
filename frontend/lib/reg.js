import axios from 'axios';
import Router from 'next/router';

export const regUser = (email,password) => {
const {data} = axios.post('http://localhost:5000/user/register', {email: email, password: password}).then((response) => {
        console.log(response.status);
        if (response !== null && email !== "" && password !== "") {
          const token = localStorage.setItem("token", response.data);
          Router.push("/privatepage")
        } else{
            alert("Unfortunately the creation of the user failed")
        }
      })
    }