import axios from 'axios';
import Router from 'next/router';
import { notify } from '../components/ForgettPasswordComponent';
import { confirmHash } from '../lib/confirmHash'

export const confirmEmail = (email) => {
  console.log("hallo");
  const { data } = axios.post('http://localhost:5000/user/confirm', { email: email }).then((response) => {
    console.log(response.status);
    if (response !== null) {
      notify("Your email has send to " + email)
      console.log(response.data);
      Router.push("confirmPage")
    } else {
      notify("Your email couldnt send")
    }
  }).catch((e) => {
    notify(e);
  }
  );
}