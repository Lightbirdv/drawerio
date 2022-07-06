import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function AboutComponent() {
	return (
		<div className="flex flex-row w-4/5 m-auto items-center gap-12">
			<img src="assets/mockup.png" className="img-fluid stroke-1" width="700" />

			<div className="">
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
