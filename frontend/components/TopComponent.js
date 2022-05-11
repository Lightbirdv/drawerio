import React from 'react'
import { Col, Container, Row } from "react-bootstrap";
import Router from 'next/router';
import 'bootstrap/dist/css/bootstrap.css';


function TopComponent() {

  const handleClick = (e, path) => {
    if(path == "/reg"){
    Router.push("/registration")
     }
  };

  return (
    /* fragment statt div, beides ok */
    <>
      <div className="background"></div>

      <div className="container" style={{ marginTop: '10px' }}>
        <div className="row">
          <div className="col-sm-4" id="xxx">
            <div className="fakeimg">
              <div className="center"><h1 style={{fontSize:"35px", marginTop:"5px"}}>Drawer</h1>
                <h2 style={{fontSize:"25px", marginTop:"5px"}}>What is Drawer.io?</h2>
                <p style={{fontSize:"15px", marginTop:"5px"}}>
                  Drawer.io is a chrome extension with which you can put together your own virtual drawers with all sorts of videos, images and texts that interest you.
                </p>
                <div margin-top="10px"></div>
                <p style={{fontSize:"15px", marginTop:"5px"}}>Expand your browser now with our great application</p>
                <p style={{fontSize:"15px", marginTop:"5px"}}>Get Your own Drawer and have an organized future</p>
                <p style={{fontSize:"25px", marginTop:"10px"}}>
                  Sign up and get your saved Datas here!
                </p>
                <div class="w3-container">
                {/* <input type="text" id="first" name="first" placeholder="Email" style={{ marginTop: "15px", padding: "3px", borderRadius: "15px" }} /> */}
                <button className="z" onClick={(e) => handleClick(e, "/reg")}>Sign Up</button></div>
                </div>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="fakeimg"><img className="fakeimg" src="/assets/landingpage.svg"/></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopComponent
