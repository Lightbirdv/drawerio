import axios from 'axios';
import Router from 'next/router';

export const forgettHash = (hash, password) => {
  const { data } = axios.post('http://localhost:5000/user/passwordReset/'+ hash, { hash: hash, password: password }).then((response) => {
    console.log(response.status);
    if (response !== null) {
      console.log(response.data);
      Router.push("/login")
    } else {
      alert("Please try again")
    }
  })
}