import React from "react";
import image from "../imagesProject/48.png";
import "./TopSite.css";

const TopSite = function (props) {
  return (
    <div className="top-site__design">
      <img src={image} alt="image of drawer icon" className="image-wiggle" />
      <p className="text__change">Drawer.io</p>
    </div>
  );
};

export default TopSite;
