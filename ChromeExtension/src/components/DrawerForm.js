import { useState } from "react";
import "./DrawerForm.css";
import axios from "axios";
import UserPage from "./UserPage";
import backImage from "../imagesProject/back.svg";
import jwtDecode from "jwt-decode";

const DrawerForm = function (props) {
  const [drawerName, setDrawerName] = useState("");
  const [goBack, setGoBack] = useState(false);
  const [missingName, setMissingName] = useState(false);
  const [successCreated, setSuccessCreated] = useState(false);
  var date = new Date();

  const textareaHandler = function (event) {
    setDrawerName(event.target.value);
  };

  const onClickGoBackHandler = function () {
    setGoBack(true);
  };

  const onClickCreateDrawerHandler = function () {
    if (drawerName !== "") {
      setMissingName(false);
      setSuccessCreated(true);
      axios
        .post(
          "http://localhost:5000/drawer/add",
          {
            drawerTitle: drawerName,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          setGoBack(true);
        });
    } else {
      setMissingName(true);
      setSuccessCreated(false);
    }
  };

  if (localStorage.getItem("token") !== null) {
    let token = localStorage.getItem("token");
    let decodedToken = jwtDecode(token);

    if (
      decodedToken.exp * 1000 < date.getTime() &&
      localStorage.getItem("token") !== null
    ) {
      axios
        .post(
          "http://localhost:5000/auth/tokenRefresh",
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("refreshToken"),
            },
          }
        )
        .then((response) => {
          localStorage.setItem("token", response.data);
        })
        .catch((error) => console.log(error));
    }
  }

  if (goBack) {
    return <UserPage />;
  }

  return (
    <div className="drawer-create-container">
      <button
        className="drawerpage-text--button-back__design"
        onClick={onClickGoBackHandler}
      >
        <img src={backImage} alt="go back"></img>
      </button>
      <input
        name="drawer"
        type="text"
        placeholder="Drawer Name..."
        size="45"
        className="drawerpage-text--drawer__design"
        onChange={textareaHandler}
      />
      {missingName && (
        <p className="error-message">
          <b>Please enter a Drawer Name.</b>
        </p>
      )}
      {successCreated && (
        <p className="success-message">
          <b>Successfully created a Drawer.</b>
        </p>
      )}
      <button
        className="drawerpage-text--button-create__design"
        onClick={onClickCreateDrawerHandler}
      >
        Create Drawer
      </button>
    </div>
  );
};
export default DrawerForm;
