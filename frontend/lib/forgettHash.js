import axios from 'axios';
import Router from 'next/router';
import { notifyx } from '../components/ForgettPasswordComponent';

export const forgettHash = (hash, password) => {
  const { data } = axios.post(process.env.NEXT_PUBLIC_API_URL+process.env.NEXT_PUBLIC_API_PORT+"user/passwordReset/"+ hash, { hash: hash, password: password }).then((response) => {
    console.log(response.status);
    if (response !== null) {
      notifyx("Your Password have been Changed!");
      setTimeout(() => {
        Router.push("/login");
      }, 2000)
    } else {
      notifyx("Unfortunately, your changes could not save");
    }
  }).catch(error => {
    notifyx("Unfortunately, your changes could not save");
  })
}