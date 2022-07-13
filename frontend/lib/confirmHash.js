import axios from 'axios';
import Router from 'next/router';
import { notify } from '../components/ConfirmComponent';

export const confirmHash = (hash) => {

  const { data } = axios.post('http://localhost:5000/user/confirmation/' + hash, { hash: hash }).then((response) => {
    console.log(response.data);
    if (response !== null) {
      notify("Thanks, Your email has been confirmed");
      setTimeout(() => {
        Router.push("/");
      }, 2000)
    } else {
      notify("Unfortunately, your email could not be confirmed");
    }
  }).catch(error => {
    notify("Unfortunately, your email could not be confirmed");
  })
}
