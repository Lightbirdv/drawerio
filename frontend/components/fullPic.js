  import React from "react";
    
    const xxx = () => {
        return Storage = localStorage.getItem("src");
    }

function FullPic(){
    console.log("was  " + xxx())
      return (
        <div>
                <img src={xxx()} style={{display:"block", marginLeft: "auto", marginRight: "auto", marginTop: "50px", width: "50%"}} />
        </div>  
      );
    }
    
    export default FullPic;


