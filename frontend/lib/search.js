import axios from "axios";
import { useEffect } from "react";

let a;
let searchField;


export const search = (text) => {
  console.log(text);
const xx = localStorage.getItem("searchTerm");
  
  
  console.log(xx);
/*     searchField = document.getElementById("finddrawer");

  console.log(searchField); */
  const { data } = axios.get(`http://localhost:5000/drawerentry/from/user/search/findBy?searchTerm=${text}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).then((response) => {
    /* localStorage.setItem("search", response.data) */
    console.log(response.data);
    a = response.data;
    return response.data;
  }
  )
  return a;
  /* y({ blogs2: data }); */
  console.log("xxxx");
  /* console.log(response); */
};