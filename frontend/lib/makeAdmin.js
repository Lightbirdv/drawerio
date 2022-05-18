import axios from 'axios';
import Router from 'next/router';

export const makeAdmin = (_id) => {
    console.log(_id)

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

    const { data } = axios.post('http://localhost:5000/user/promotetoadmin',
        {
            email: _id
        }, {
        headers: headers
    }).then((response) => {
        console.log(response);
    })
}