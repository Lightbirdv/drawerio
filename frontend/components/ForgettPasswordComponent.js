import { confirmHash } from '../lib/confirmHash';
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./NavbarThree";
import { Button } from 'react-bootstrap';
import { } from '../lib/newPw';
import { newPw } from '../lib/newPw';
import Router from 'next/router';
import { forgettHash } from '../lib/forgettHash';
import { ToastContainer, toast } from 'react-toastify';

export const notifyx = (message) => toast(message);

class ForgettPasswordComponent extends React.Component {

    state = {
        email: '',
        password: ''
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        const { email, password } = this.state;
        event.preventDefault();
        console.log(email, password)
        const p = email.split('/').pop();
        console.log(p)
        forgettHash(p, password);
    }

    render() {
        return (
            <div >
                {/* Password input */}
                <form onSubmit={this.handleSubmit}>
                    <h1 style={{ textAlign: "center", margin: "20px" }}>Please enter your changes</h1>
                    <p style={{ textAlign: "center", margin: "20px" }}>please enter the Code and your new Password.</p>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "20px" }}>
                        <input type="text" id="form3Example4" className="form-control form-control-lg" placeholder="Enter the Code" name="email" onChange={this.handleChange} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "20px" }}>
                        <input type="password" id="form3Example4" className="form-control form-control-lg" placeholder="Your new password" name="password" onChange={this.handleChange} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "60px" }} className="text-center text-lg-start mt-4 pt-2">
                        <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Confirm your changes</button>
                    </div>
                </form>
                <div>
                    <ToastContainer />
                </div>
            </div>
        )
    }

}
export default ForgettPasswordComponent;

