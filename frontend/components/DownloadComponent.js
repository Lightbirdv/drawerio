import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function DownloadComponent() {
  return (
    <div className="service-container-bg">
      <Container className="service-container">
        <Row>
          <Col xs={12} md={4}>
            <img src="assets/kontakt.png" className="img-fluid service-img" />
            <p className="textpic">
            Please contact us if you have further questions!
            </p>
          </Col>
          <Col xs={12} md={4}>
            <img src="assets/puzzel.png" className="img-fluid service-img" />
            <p className="textpic">
            Help us complete the puzzle with your feedback.
            </p>
          </Col>
          <Col xs={12} md={4}>
            <img
              src="assets/win.png"
              className="img-fluid service-img"
            />
            <p className="textpic">
            So that we can become your best helper!
            </p>
          </Col>
        </Row>
        
      </Container>
    </div>
  );
}


export default DownloadComponent;