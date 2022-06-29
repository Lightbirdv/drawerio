import axios from 'axios';
import Router from 'next/router';
import {forgettHash} from './forgettHash'

export const newPw = (email) => {
  const { data } = axios.post('http://localhost:5000/user/forgot', {email: email}).then((response) => {
    console.log(response.status);
    if (response !== null) {
      
      console.log(response.data);
      const enteredName = prompt('Please enter the Code');
      const enteredPw = prompt('Please enter your new PW');
      forgettHash(enteredName,enteredPw);
     /*  Router.push("/") */
    } else {
      alert("Please confirm your Email adress again")
    }
  })
}