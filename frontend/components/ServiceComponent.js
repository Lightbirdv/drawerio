import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function ServiceComponent() {
  return (
    <div className="service-container-bg">
      <Container className="service-container">
        <Row>
          <Col xs={12} md={4}>
            <img src="assets/tacho.png" className="img-fluid service-img" />
            <h2>Fast</h2>
            <p>
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text
              used.
            </p>
          </Col>
          <Col xs={12} md={4}>
            <img src="assets/easy.jpg" className="img-fluid service-img" />
            <h2>Easy</h2>
            <p>
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text
              used.
            </p>
          </Col>
          <Col xs={12} md={4}>
            <img
              src="assets/arbeit.jpg"
              className="img-fluid service-img"
            />
            <h2>CLean</h2>
            <p>
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text
              used.
            </p>
          </Col>
        </Row>
        <hr />
      </Container>
    </div>
  );
}

export default ServiceComponent;