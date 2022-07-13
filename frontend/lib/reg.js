import axios from 'axios';
import Router from 'next/router';
import {confirmEmail} from '../lib/confirmMail'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifys = (message) => toast(message);

export const regUser = (email, confirm, password) => {
  console.log(email, confirm, password);
 
  const { data } = axios.post('http://localhost:5000/user/register', { email: email, password: password }).then((response) => {
    console.log(response.message);
    if (response.status === 200, email !== "" && password !== "" && password === confirm) {
      /* confirmEmail(confirm); */
      console.log(response.data);
      confirmEmail(email);
      /* Router.push("/confirmPage") */
      /* Router.push("/"); */
    } else {
      notifys("Unfortunately the creation of the user failed")
    }
  }).catch(error => {
    notifys("Unfortunately the creation of the user failed")
  })
}