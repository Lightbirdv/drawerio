  import React from "react";
    
    const xxx = () => {
        return Storage = localStorage.getItem("src");
    }

function FullPic(){
    console.log("was  " + xxx())
      return (
        <div>
                <img className="bg-white shadow-sm rounded-l" src={xxx()} style={{display:"block", marginLeft: "auto", marginRight: "auto", marginTop: "50px", width: "50%",/*  borderStyle: "solid", borderWidth:"20px", borderColor:"black" */ }} />
        </div>  
      );
    }
    
    export default FullPic;


