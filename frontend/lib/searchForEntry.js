import axios from 'axios';
import Router from 'next/router';

export const searchForEntry = (drawerID, term) => {
   /*  console.log(term)
    console.log(drawerID) */
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    const { data } = axios.get(`http://localhost:5000/drawerentry/search/findBy?searchTerm=${term}&drawer=${drawerID}`,
        {
            headers: headers
        }).then((response) => {
            /* console.log(response.data[0]); */
            
        })
}