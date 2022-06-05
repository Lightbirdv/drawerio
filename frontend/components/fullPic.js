  import React from "react";
    
    const xxx = () => {
        return Storage = localStorage.getItem("src");
    }

function FullPic(){
    console.log("was  " + xxx())
      return (
        <div>
                <img src={xxx()} style={{display:"block", marginLeft: "auto", marginRight: "auto", marginTop: "50px", width: "50%",/*  borderStyle: "solid", borderWidth:"20px", borderColor:"black" */ boxShadow: "20px 20px 20px 20px white"}} />
        </div>  
      );
    }
    
    export default FullPic;


