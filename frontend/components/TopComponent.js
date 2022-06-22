import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Router from "next/router";
import "bootstrap/dist/css/bootstrap.css";

function TopComponent() {
  const handleClick = (e, path) => {
    if (path == "/reg") {
      Router.push("/registration");
    }
  };

  return (
    <>
      <div className="bg-emerald-200">
        <div className="TopComponent-Container flex flex-row w-4/5 m-auto items-center ">
          <div className="TopComponent-Cta w-1/3">
            <h2 className="text-blue-800 text-5xl">Level up your notes now!</h2>
            <p className="mt-8 text-gray-700 text-xl">
              Drawer.io is a chrome extension with which you can put together
              your own virtual drawers with all sorts of saved images and
              texts that interest you.<br></br> 
              Expand your browser now with our great
              application create your own drawer and have an organized future.
            </p>
            <button
              className="bg-blue-800 w-36 h-10 text-white rounded mt-4 text-xl"
              onClick={(e) => handleClick(e, "/reg")}
            >
              Sign Up
            </button>
          </div>
          <img
            className="TopComponent-Cta-Image w-2/3 pl-10 py-10"
            src="/assets/landingpage.svg"
          />
        </div>
      </div>
    </>
  );
}

export default TopComponent;
