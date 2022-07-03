import { confirmHash } from '../lib/confirmHash';
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "../components/NavbarThree";
import { Button } from 'react-bootstrap';
import { } from '../lib/newPw';
import { newPw } from '../lib/newPw';
import Router from 'next/router';

class ConfirmComponent extends React.Component {

    state = {
        email: ''
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        const {email} = this.state;
        event.preventDefault();
        console.log(email)
        const p = email.split('/'). pop();
        console.log(p)
        confirmHash(p);
    }



    render() {
        return (
            <div >
                {/* Password input */}
                <form onSubmit={this.handleSubmit}>
                <div style={{display:"flex", justifyContent: "center", alignItems: "center", margin: "20px"}}>
                    <input type="text" id="form3Example4" className="form-control form-control-lg" placeholder="Enter your confirmationcode" name="email" onChange={this.handleChange} />
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Confirm</button>
                </div>
                </form>
            </div>
        )
    }

}
export default ConfirmComponent;

