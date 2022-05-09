import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function ServiceComponent() {
  return (
    <div className="service-container-bg">
      <Container className="service-container">
        <Row>
          <Col xs={12} md={4}>
            <img src="assets/tacho.png" className="img-fluid service-img" />
            <h2>Incredible fast</h2>
            <p>
            There is no faster way to access your data.
            </p>
          </Col>
          <Col xs={12} md={4}>
            <img src="assets/easy.jpg" className="img-fluid service-img" />
            <h2>Extremely easy</h2>
            <p>
            Drawer.io is easy to understand for everyone and extremely easy to use.
            </p>
          </Col>
          <Col xs={12} md={4}>
            <img
              src="assets/arbeit.jpg"
              className="img-fluid service-img"
            />
            <h2>Clean</h2>
            <p>
            Forget your information chaos and look forward to orderly data
            </p>
          </Col>
        </Row>
        <hr />
      </Container>
    </div>
  );
}

export default ServiceComponent;