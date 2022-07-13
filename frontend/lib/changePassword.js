import axios from 'axios';
import Router from 'next/router';
import { notifNewPW } from '../components/ResetPasswordComponent';

export function changePassword(newPassword, hash) {

  console.log(hash)
  console.log(newPassword)
  const { data } = axios.post(`http://localhost:5000/user/passwordReset/${hash}`, { password: newPassword }).then((response) => {
    console.log(response);
    if (response.status === 200) {
      notifNewPW("Your password has been successfully changed!");
      console.log(response.data);
      setTimeout(() => {
        Router.push("/login")
      }, 3000)


    }
    else {
      alert("Unfortunately the password could not be changed")
    }
  }).catch(e => {
    alert(e)
  });

}