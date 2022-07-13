import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { goImpressum } from "../lib/goImpressum";
import { goDS } from "../lib/goDatenschutz";
import { goAgb } from "../lib/goAGB";

const imp = (e) => {
  e.preventDefault();
  goImpressum()
}

const dS = (e) => {
  e.preventDefault();
  goDS()
}

const a = (e) => {
  e.preventDefault();
  goAgb()
}


function ContactComponent() {
  return (
    <div className="contact-container-bg">
      <Container className="contact-component">
        <Row>
          <Col xs={12} md={6}>
            <b>Rate us in the Google Webstore!</b>
            <br />
            <br />
            <p>
              Your feedback can help us a lot. Gladly via the Google Webstore or gladly directly by email or by phone.
            </p>
            <div>
              <span className="fa fa-facebook-square"></span>
              <span className="fa fa-instagram"></span>
              <span className="fa fa-linkedin-square"></span>
            </div>
          </Col>
          <Col xs={12} md={3}>
            <b>Links</b>
            <br />
            <br />
            <h6>Overview</h6>
            <h6>Social Media</h6>
            <h6>Contact</h6>
          </Col>
          <Col xs={12} md={3}>
            <b>Company</b>
            <br />
            <br />
            <h6>
              <a href="" className="one" onClick={(e) => {
                { imp(e) }
              }}>Impressum</a></h6>
            <h6>
              <a href="" className="one" onClick={(e) => {
                { a(e) }
              }}>AGB</a></h6>
            <h6>
              <a href="" className="one" onClick={(e) => {
                { dS(e) }
              }}>Datenschutz</a>
            </h6>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContactComponent;
