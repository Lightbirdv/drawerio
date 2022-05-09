import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function DownloadComponent() {
  return (
    <div className="download-container-bg">
      <Container className="download-component">
        
        <h3 style={{marginTop: "10px"}}>Questions?</h3>
        <p>
          Telefonnummer: 030288395
          Email: s85858@drawer.com
        </p>
        {/* <Container className="img-download">
          <img
            src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
            className="img-fluid"
          />
          <img
            src="https://i2.wp.com/mofc.unic.ac.cy/wp-content/uploads/revslider/decentralized-2020-home-slider1-12/get-it-on-app-store.png?ssl=1"
            className="img-fluid"
          />
        </Container> */}

        <Container className= "img-contact">
        <img
            src="assets/contact.jpg"
            className="img-fluid"
          />
        </Container>
      </Container>
    </div>
  );
}

export default DownloadComponent;