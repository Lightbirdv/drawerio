import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function AboutComponent() {
  return (
    <div className="about-container-bg">
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <img src="assets/chrome.jpg" className="img-fluid" />
          </Col>
          <Col xs={12} md={6} className="about-details">
            <div>
              <h2>Google Chrome Extension</h2>
              <b>Why Google Chrome? Because it is the most popular browser</b>
              <br />
              <br />
              <p>
                Go to the Chrome Web Store.
                Search for drawer.io and select it.
                Click Add to Chrome.
                Our logo will appear in the top right corner of the browser. Click on it and a login window will open.
                Sign up and get started!
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AboutComponent;