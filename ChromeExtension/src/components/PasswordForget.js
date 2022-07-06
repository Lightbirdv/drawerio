import React, { useState } from "react";
import axios from "axios";
import "./PasswordForget.css";
import LoginForm from "./LoginForm";

const PasswordForget = function () {
  const [emailForgot, setEmailForgot] = useState("");
  const [successSend, setSuccessSend] = useState(false);
  const [goBack, setGoBack] = useState(false);

  const handleChange = (event) => {
    setEmailForgot(event.target.value);
  };

  const handleClick = () => {
    axios
      .post("http://localhost:5000/user/forgot", {
        email: emailForgot,
      })
      .then((response) => {
        setSuccessSend(true);
        setTimeout(() => setGoBack(true), 1000);
      })
      .catch((error) => console.log(error));
  };

  if (goBack) {
    return <LoginForm />;
  }

  return (
    <div className="forget-form-container">
      <div className="forget-form--text">
        <p>Hello, please log in!</p>
      </div>
      <div className="forget-form--email">
        <input
          type="email"
          onChange={handleChange}
          placeholder="example@example.com"
          className="forget-form--email__design"
          size="45"
        />
      </div>
      {successSend && (
        <p className="success-email-message">
          <b>Successfully send Email. Check your Email Box.</b>
        </p>
      )}
      <button
        onClick={handleClick}
        className="forget-form--button-forget__design"
      >
        Send Email
      </button>
    </div>
  );
};

export default PasswordForget;
