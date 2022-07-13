import axios from 'axios';
import Router from 'next/router';
import { notifyc } from '../components/NewPasswordComponent';
import { forgettHash } from './forgettHash'

export const newPw = (email) => {
  const { data } = axios.post(process.env.NEXT_PUBLIC_API_URL+process.env.NEXT_PUBLIC_API_PORT+"user/forgot", { email: email }).then((response) => {
    console.log(response.status);
    if (response !== null) {
      notifyc("An email has send to " + email);
      console.log(response.data);
      setTimeout(() => {
        Router.push("/")
      }, 2000)
    } else {
      notifyc("Your email couldnt send")
    }
  }).catch((e) => {
    notifyc("Your email couldnt send");
  }
  );
}