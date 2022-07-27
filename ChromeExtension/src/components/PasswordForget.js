import React, { useState } from "react";
import axios from "axios";
import "./PasswordForget.css";
import "./RegisterForm.css";
import LoginForm from "./LoginForm";

const PasswordForget = function () {
  const [goLoginPage, setGoLoginPage] = useState(false);
  const [emailForgot, setEmailForgot] = useState("");
  const [successSend, setSuccessSend] = useState(false);
  const [goBack, setGoBack] = useState(false);

  const handleChange = (event) => {
    setEmailForgot(event.target.value);
  };

  const handleClick = () => {
    axios
      .post(process.env.REACT_APP_DRAWERIO_API_KEY + "/user/forgot", {
        email: emailForgot.toLowerCase(),
      })
      .then((response) => {
        setSuccessSend(true);
        setTimeout(() => setGoBack(true), 1000);
      })
      .catch((error) => console.log(error));
  };

  if (goLoginPage || goBack) {
    return <LoginForm />;
  }

  return (
    <div className="forget-form-container">
      <div className="forget-form--text">
        <p>Please enter your Email</p>
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

      <button
        type="submit"
        onClick={() => setGoLoginPage(true)}
        className="forget-form--button-back__design"
      >
        Go Back
      </button>
    </div>
  );
};

export default PasswordForget;
