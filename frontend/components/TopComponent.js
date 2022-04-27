import React from 'react'
import { Col, Container, Row } from "react-bootstrap";

function TopComponent() {
    return (
        /* fragment statt div, beides ok */
        <>
        <div className="background"></div>
        <div className="texture">
          <Container className="container-top">
            <Row className="section-top">
              <Col xs={12} md={6} className="section-top-left">
                <img className="img-fluid" src="/assets/laptop.jpg" />
              </Col>
              <Col xs={12} md={6} className="section-top-right shadow">
                <div className="plate-img-container">
                  <img
                    className="plate-img img-fluid"
                    src="/assets/plate-two.jpg"
                  />
                  <img
                    className="plate-img img-fluid"
                    src="/assets/plate-three.jpg"
                  />
                </div>
                <h6>Drawer</h6>
                <h2>Get Your Drawer now</h2>
                <h1>simplify your information gathering</h1>
                <p>
                  Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                  used in laying out print, graphic or web designs.
                </p>
                <button className="btn btn-custom">Download App</button>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }

export default TopComponent