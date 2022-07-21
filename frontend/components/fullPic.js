import React from "react";
import { Image } from "react-bootstrap";

const xxx = () => {
  if (typeof window !== 'undefined') {
    return Storage = localStorage.getItem("src");
  }
}

function FullPic() {
  /* console.log("was  " + xxx()) */
  return (
    <div>
      <Image alt="a" src={xxx()} style={{ display: "block", marginLeft: "auto", marginRight: "auto", marginTop: "50px", width: "50%",/*  borderStyle: "solid", borderWidth:"20px", borderColor:"black" */ boxShadow: "20px 20px 20px 20px white" }} />
    </div>
  );
}

export default FullPic;


