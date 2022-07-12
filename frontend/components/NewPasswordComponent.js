import { confirmHash } from '../lib/confirmHash';
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./NavbarThree";
import { Button } from 'react-bootstrap';
import { } from '../lib/newPw';
import { newPw } from '../lib/newPw';
import Router from 'next/router';
import { ToastContainer, toast } from 'react-toastify';

export const notifyc = (message) => toast(message);

class NewPasswordComponent extends React.Component {

    state = {
        email: ''
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        const { email } = this.state;
        event.preventDefault();
        console.log(email)
        newPw(email);
    }


    render() {
        return (
            <div >
                {/* Password input */}
                <form onSubmit={this.handleSubmit}>
                    <h1 style={{ textAlign: "center", margin: "20px" }}>Have You forgotten your Password?</h1>
                    <p style={{ textAlign: "center", margin: "20px" }}>please enter your email, we will send you a Link, please klick the Link an change Your Password there.</p>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "60px" }}>
                        <input style={{ textAlign: "center" }} type="email" id="form3Example4" className="form-control form-control-lg" placeholder="Enter your email" name="email" onChange={this.handleChange} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "60px" }} className="text-center text-lg-start mt-4 pt-2">
                        <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Send to this email</button>
                    </div>
                </form>
                <div>
                    <ToastContainer />
                </div>
            </div>
        )
    }

}
export default NewPasswordComponent;

