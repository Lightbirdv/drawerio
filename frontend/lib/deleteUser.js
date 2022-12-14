import axios from 'axios';

export const deleteUser = (id) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +localStorage.getItem('token')
    }

    const {data} = axios.delete(process.env.NEXT_PUBLIC_API_URL+process.env.NEXT_PUBLIC_API_PORT+"user/"+id,{
      headers: headers
    }
     ).then((response) => {
      console.log( 'hi   ' + response.status);
        if (response.status == 500) {
          alert("Cannot delete this User")
        }
      })
    }