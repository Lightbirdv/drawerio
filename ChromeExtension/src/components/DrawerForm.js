import { useState } from "react";
import "./DrawerForm.css";
import axios from "axios";
import UserPage from "./UserPage";

const DrawerForm = function (props) {
  const [drawerName, setDrawerName] = useState("");
  const [goBack, setGoBack] = useState(false);
  const [missingName, setMissingName] = useState(false);
  const [successCreated, setSuccessCreated] = useState(false);

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
        .then((response) => console.log(response));
    } else {
      setMissingName(true);
      setSuccessCreated(false);
    }
  };

  if (goBack) {
    return <UserPage />;
  }

  return (
    <div>
      <button
        className="drawerpage-text--button-back__design"
        onClick={onClickGoBackHandler}
      >
        Go Back
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

