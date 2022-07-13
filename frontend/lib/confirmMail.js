import axios from 'axios';
import Router from 'next/router';
import { confirmHash } from '../lib/confirmHash'
import { notifyReg } from '../components/RegisterComponent';

export const confirmEmail = (email) => {
  const { data } = axios.post('http://localhost:5000/user/confirm', { email: email }).then((response) => {
    console.log(response.status);
    if (response !== null) {

      notifyReg("Your email has send to " + email)
      console.log(response.data);

      /* Router.push("confirmPage") */
      setTimeout(() => {
        Router.push("/login")
      }, 5000)
    } else {
      notifyReg("Your email couldnt send")
    }
  }).catch((e) => {
    notifyReg(e);
  }
  );
}