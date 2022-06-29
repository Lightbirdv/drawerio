import axios from 'axios';
import Router from 'next/router';

export const confirmHash = (hash) => {
  const { data } = axios.post('http://localhost:5000/user/confirmation/'+ hash, { hash: hash }).then((response) => {
    console.log(response.status);
    if (response !== null) {
      console.log(response.data);
      Router.push("/")
    } else {
      alert("Your Code is wrong")
    }
  })
}