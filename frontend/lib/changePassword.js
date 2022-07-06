import axios from 'axios';
import Router from 'next/router';

export function changePassword (newPassword, hash) { 
    
    console.log(hash)
    console.log(newPassword)
    const { data } = axios.post(`http://localhost:5000/user/passwordReset/${hash}`, { password: newPassword }).then((response) => {
        console.log(response);
        if (response.status === 200) {
            Router.push("/login")
        }
        else {
          alert("Unfortunately the password could not be changed")
        }
      }).catch(e => {
          alert(e)
      });
    
}