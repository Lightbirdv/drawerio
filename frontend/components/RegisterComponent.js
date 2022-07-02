import { regUser } from "../lib/reg";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../components/NavbarThree";

class RegComponent extends React.Component {
	state = {
		email: "",
		confirmEmail: "",
		password: "",
	};

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = (event) => {
		const { email, confirmEmail, password } = this.state;
		console.log("Reg User " + this.state);
		event.preventDefault();
		regUser(email, confirmEmail, password);
	};

	render() {
		return (
			<div>
				{" "}
				<Navbar />
				<section className="vh-100">
					<div className="container-fluid h-custom" style={{ backgroundColor: "rgb(167 243 208)" }}>
						<div className="row d-flex justify-content-center align-items-center h-100">
							<div className="col-md-9 col-lg-6 col-xl-5">
								<img
									src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
									className="img-fluid"
									alt="Sample image"
								/>
							</div>
							<div className="col-md-8 col-lg-6 col-xl-4 offset-l-1">
								<form onSubmit={this.handleSubmit}>
									{/* Email input */}
									<div className="form-outline mb-4">
										{/* drawerio\frontend\public\assets\regxx.png */}
										{/* <img src="assets/regxx.png" className="center" /> */}
                    <h3 className="text-gray-600 mb-8">Registration</h3>
										<input
											type="email"
											id="form3Example3"
											className="form-control form-control-lg"
											placeholder="Enter a valid email address"
											name="email"
											onChange={this.handleChange}
										/>
										{/* <label className="form-label" htmlFor="form3Example3">
											Email address
										</label> */}
									</div>

									<div className="form-outline mb-4">
										<input
											type="email"
											id="form3Example3"
											className="form-control form-control-lg"
											placeholder="Enter your email address again"
											name="confirmEmail"
											onChange={this.handleChange}
										/>
										{/* <label className="form-label" htmlFor="form3Example3">
											Confirm your Email address
										</label> */}
									</div>

									{/* Password input */}
									<div className="form-outline mb-3">
										<input
											type="password"
											id="form3Example4"
											className="form-control form-control-lg"
											placeholder="Enter password"
											name="password"
											onChange={this.handleChange}
										/>
										{/* <label className="form-label" htmlFor="form3Example4">
											Password
										</label> */}
									</div>
									<div className="text-center text-lg-start mt-4 pt-2">
										<button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>
											Sign Up
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
						{/* Copyright */}
						<div className="text-white mb-3 mb-md-0">Copyright © 2020. All rights reserved.</div>
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

export default RegComponent;
