import React from 'react'
import { Col, Container, Row } from "react-bootstrap";
import Link from 'next/link';


function TopComponent() {

  const handleClick = (e, path) => {
        <Link href="/about"></Link>
  };

  return (
    /* fragment statt div, beides ok */
    <>
      <div className="background"></div>
      <div className="texture">
        <Container className="container-top">
          <Row className="section-top">
            <Col xs={6} md={6} className="section-top-left">
              <img className="img-fluid" src="/assets/landingpage.svg" />
            </Col>
            <Col xs={6} md={6} className="section-top-right shadow">
              <h6>Drawer</h6>
              <h2>What is Drawer.io?</h2>
              <p>
                Drawer.io is a chrome extension with which you can put together your own virtual drawers with all sorts of videos, images and texts that interest you.
              </p>
              <div margin-top="10px"></div>
              <h6>Expand your browser now with our great application</h6>
              <h2>Get Your own Drawer and have a have an organized future</h2>
              <p>
                Sign up and get your saved Datas here!
              </p>
                <input type="text" id="first" name="first" placeholder="Email" style={{ marginTop: "15px", padding: "3px" }} />
                <button className="btn btn-custom" onClick={(e) => handleClick(e, "/about")}>Sign Up</button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default TopComponent