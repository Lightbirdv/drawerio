import { loginUser } from "../lib/auth";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../components/NavbarThree";
import { Button } from 'react-bootstrap';
import { newPw } from '../lib/newPw';
import Router from 'next/router';

const forgettPw = (e) =>{
  e.preventDefault();
  /* const enteredName = prompt('Please enter your Email adress');
  newPw(enteredName); */
  Router.push("/newPassword");
}

const goToReg = (e) => {
	e.preventDefault();
	Router.push("/registration");
};

const goToConfirm = (e) =>{
  e.preventDefault();
  Router.push("/confirmPage")
  }

class LoginComponent extends React.Component {
	state = {
		email: "",
		password: "",
	};

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = (event) => {
		const { email, password } = this.state;
		event.preventDefault();
		console.log(email, password);
		loginUser(email, password);
	};

  render() {
    return (
      <div>
        <Navbar />
        <section className="vh-100">
          <div className="container-fluid h-custom" style={{ backgroundColor: "rgb(167 243 208)" }}>
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
              {/* <h1 className="text-blue-800 text-5xl" style={{textAlign:"center"}}>Login here!</h1> */}
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form onSubmit={this.handleSubmit}>
                  {/* Email input */}
                  <div className="form-outline mb-4">
                  <h3 className="text-gray-600 mb-8">Login</h3>
                    <input type="test" id="form3Example3" className="form-control form-control-lg" placeholder="Enter a valid email address" name="email" onChange={this.handleChange} />

                  </div>
                  {/* Password input */}
                  <div className="form-outline mb-3">
                    <input type="password" id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" name="password" onChange={this.handleChange} />
                    

                  </div>
                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', backgroundColor:"rgb(30 64 175)", color:"white"  }}>Login</button>
                    {/*                   <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!" className="link-danger">Register</a></p>
 */}                </div>
                </form>
              </div>
              <div>
                  <button style={{backgroundColor: "rgb(167 243 208)", fontSize: "13px", color: "black"}} onClick={(e) => { { forgettPw(e) }}} >Forgot password?</button>
                  <button style={{backgroundColor: "rgb(167 243 208)", fontSize: "13px", color: "black", marginLeft:"10px"}} onClick={(e) => { { goToConfirm(e) }}} >Confirm your email here</button>
                  <button style={{backgroundColor: "rgb(167 243 208)", fontSize: "13px", color: "black", marginLeft:"10px"}} onClick={(e) => { { goToReg(e) }}} >Don't have an account?</button> 
                  </div>
            </div>
          </div>
          <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5" style={{backgroundColor:"rgb(30 64 175)"}}>
            {/* Copyright */}
            <div className="text-white mb-3 mb-md-0">
              Copyright © 2020. All rights reserved.
            </div>
            {/* Copyright */}
            {/* Right */}
            <div>
              <a href="#!" className="text-white me-4">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#!" className="text-white me-4">
                <i className="fab fa-twitter" />
              </a>
              <a href="#!" className="text-white me-4">
                <i className="fab fa-google" />
              </a>
              <a href="#!" className="text-white">
                <i className="fab fa-linkedin-in" />
              </a>
            </div>
            {/* Right */}
          </div>
        </section>
      </div>
    );
  }
}

export default LoginComponent;
