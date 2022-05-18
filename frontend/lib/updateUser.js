import axios from 'axios';
import Router from 'next/router';

export const updateUser = (email, password, id) => {
  console.log(email, password, id)

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }


  const { data } = axios.patch('http://localhost:5000/user/' + id,
    {
      email: email,
      password: password
    }, {
    headers: headers
  }).then((response) => {
    console.log(response);
  })
}