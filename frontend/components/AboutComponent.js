import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import {Image} from "react-bootstrap";

/* const consentPropertyName = 'jdc_consent';

const shouldShowPopop = () => {
	!localStorage.getItem(consentPropertyName);
	console.log("asdasasdasdasdasdasdasdd");
};

const saveToStorage = () => {
	localStorage.setItem(consentPropertyName, true);
}

if (typeof window !== "undefined") {
	window.onload = () => {
		if (shouldShowPopop()) {
			const consent = confrim("asdsa");
			console.log("fdfffffffffffffffffffff");
			<div className="alert alert-primary" role="alert">
				This is a primary alert—check it out!
			</div>
			if (consent) {
				saveToStorage();
				console.log("aaaaa");
				<div className="alert alert-primary" role="alert">
					This is a primary alert—check it out!
				</div>
			}
		}
		console.log("asdasd");
		<div className="alert alert-primary" role="alert">
			This is a primary alert—check it out!
		</div>
		alert("hello!");
	}
} */

function AboutComponent() {
	return (
		<div  className="flex flex-row w-4/5 m-auto items-center gap-12">
			<Image alt="hey" src="assets/mockup.png" className="img-fluid stroke-1" width="700" />

			<div style={{margin:"20px"}} className="">
				<h2>Google Chrome Extension</h2>
				<b>Why Google Chrome? Because it is the most popular browser</b>
				<br />
				<br />
				<p>
					Go to the Chrome Web Store. Search for drawer.io and select it. Click Add to Chrome. Our logo will appear in the top right corner of the
					browser. Click on it and a login window will open. Sign up and get started!
				</p>
			</div>
		</div>
	);
}

export default AboutComponent;
