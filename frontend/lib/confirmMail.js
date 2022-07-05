import axios from 'axios';
import Router from 'next/router';
import {confirmHash} from '../lib/confirmHash'

export const confirmEmail = (email) => {
  console.log(email);
  const { data } = axios.post('http://localhost:5000/user/confirm', {email: email}).then((response) => {
    console.log(response.status);
    if (response !== null) {
      
      console.log(response.data);
/*       const enteredName = prompt('Please enter the Code');
 */      /* confirmHash(enteredName); */
      Router.push("confirmPage")
    } else {
      alert("Please confirm your Email adress again")
    }
  })
}