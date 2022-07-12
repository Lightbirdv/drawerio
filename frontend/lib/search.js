import axios from "axios";

export const search = (text) => {

    const { data } = axios.get(`http://localhost:5000/drawerentry/from/user/search/findBy?searchTerm=${text}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
        return response
    }
    )
    /* y({ blogs2: data }); */
    console.log("xxxx");
    console.log(data);
};