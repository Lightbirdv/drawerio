import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../components/NavbarThree";
import { changePassword } from "../lib/changePassword";
import { useForm, withForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

class ResetPasswordComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newPassword: "",
			confirmPassword: "",
			error: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({ error: "" });
		const { newPassword, confirmPassword } = this.state;
		const hash = this.props.hash;
		console.log(newPassword)
		console.log(confirmPassword)
		if (newPassword !== confirmPassword) {
			this.setState({ error: "Passwords do not match" });
			console.log("Passwords do not match");
			return;
		}
		if (newPassword === "" || confirmPassword === "") {
			this.setState({ error: "Please fill in all fields" });
			console.log("Please fill in all fields");
			return;
		}
		changePassword(newPassword, hash);
	}

	render() {
		return (
			<div>
				<Navbar />
				<section className="vh-100">
					<div className="container-fluid h-custom" style={{ backgroundColor: "rgb(167 243 208)" }}>
						<div className="flex justify-content-center align-items-center h-100">
							<div className="col-md-8 col-lg-6 col-xl-4 offset-l-1">
								<form onSubmit={this.handleSubmit}>
									<div className="form-outline mb-4">
										<h3 className="text-gray-600 mb-8">Reset your password</h3>
										<input
											type="password"
											id="newPassword"
											className="form-control form-control-lg mb-4"
											placeholder="Enter new Password"
											name="newPassword"
											minLength={8}
											onChange={this.handleChange}
										/>
										<input
											type="password"
											id="confirmPassword"
											className="form-control form-control-lg"
											placeholder="Re-enter new Password"
											name="confirmPassword"
											minLength={8}
											onChange={this.handleChange}
										/>
										<p className="text-lg text-red-600 mt-4">{this.state.error}</p>
									</div>
									<div className="text-center text-lg-start mt-4 pt-2">
										<button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>
											Reset Password
										</button>
									</div>
									<p></p>
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

export default ResetPasswordComponent;
