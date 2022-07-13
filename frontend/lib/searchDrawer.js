import axios from "axios";

const a = "";

export const searchDrawer = (text) => {

    
    const { data } = axios.get(`http://localhost:5000/drawer/search/findBy?searchTerm=${text}`, {
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