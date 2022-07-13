import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function ServiceComponent() {
  return (
    <div style={{margin:"20px"}} className="service-container-bg">
      <Container className="service-container">
        <Row>
          <Col xs={12} md={4}>
            <img src="assets/fast-time.png" className="img-fluid service-img" />
            <p className="textpic">
            There is no faster way to access your data.
            </p>
          </Col>
          <Col xs={12} md={4}>
            <img src="assets/click.png" className="img-fluid service-img" />
            <p className="textpic">
            Drawer.io is easy to understand for everyone and extremely easy to use.
            </p>
          </Col>
          <Col xs={12} md={4}>
            <img
              src="assets/house.png"
              className="img-fluid service-img"
            />
            <p className="textpic">
            Forget your information chaos and look forward to orderly data
            </p>
          </Col>
        </Row>
        
      </Container>
    </div>
  );
}

export default ServiceComponent;