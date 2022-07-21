import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RegisterForm.css";
import { set, useForm } from "react-hook-form";
import LoginForm from "./LoginForm";

const RegisterForm = function (props) {
  const [goLoginPage, setGoLoginPage] = useState(false);
  const [sameUser, setSameUser] = useState(false);
  const [successReg, setSuccessReg] = useState(false);
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [notSame, setNotSame] = useState(false);
  const [notLong, setNotLong] = useState(false);
  const [notSamePW, setNotSamePW] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (passwordOne !== passwordTwo && notSame === false) {
      setNotSame(true);
    } else if (passwordOne === passwordTwo && notSame !== false) {
      setNotSame(false);
    }

    if (
      (passwordOne.length < 4 && passwordOne.length !== 0) ||
      (passwordTwo.length < 4 && passwordTwo.length !== 0)
    ) {
      setNotLong(true);
    } else if (passwordOne.length >= 4 || passwordTwo.length >= 4) {
      setNotLong(false);
    }
  }, [passwordOne, passwordTwo]);

  if (goLoginPage) {
    return <LoginForm />;
  }

  const handlePasswordOneOnChange = (event) => {
    setPasswordOne(event.target.value);
  };

  const handlePasswordTwoOnChange = (event) => {
    setPasswordTwo(event.target.value);
  };

  return (
    <div className="register-form-container">
      <div className="register-form--text">
        <p>Registration</p>
      </div>
      <form
        className="register-form__design"
        onSubmit={handleSubmit((data) => {
          if (notSamePW === false && notLong === false && notSame === false) {
            if (passwordOne.length !== 0 || passwordTwo.length !== 0) {
              axios
                .post(
                  process.env.REACT_APP_DRAWERIO_API_KEY + "/user/register",
                  {
                    email: data.email,
                    password: passwordOne,
                  }
                )
                .then((response) => {
                  setSameUser(false);
                  setNotSamePW(false);
                  setNotSame(false);
                  setNotLong(false);
                  setSuccessReg(true);
                  axios
                    .post(
                      process.env.REACT_APP_DRAWERIO_API_KEY + "/user/confirm",
                      {
                        email: data.email,
                      }
                    )
                    .then((response) => console.log("Successfully send Email."))
                    .catch((error) => console.log(error));
                  setTimeout(() => {
                    setGoLoginPage(true);
                  }, 1000);
                })
                .catch((error) => {
                  setSameUser(true);
                });
            } else {
              setNotSame(true);
            }
          }
        })}
      >
        <div className="register-form--email">
          <input
            type="email"
            {...register("email", {
              required: "This is required.",
              pattern: {
                value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "This is an invalid email",
              },
            })}
            placeholder="example@example.com"
            className="register-form--email__design"
            size="45"
          />
          <p className="error-message">
            <b>{errors.email?.message}</b>
          </p>
        </div>
        <div className="register-form--password">
          <input
            type="password"
            onChange={handlePasswordOneOnChange}
            placeholder="Password"
            className="register-form--password__design"
            size="45"
            style={{ borderColor: notSame ? "red" : "" }}
          />
          <input
            type="password"
            onChange={handlePasswordTwoOnChange}
            placeholder="Password"
            className="register-form--password__design"
            size="45"
            style={{ borderColor: notSame ? "red" : "" }}
          />
          <p className="error-message">
            {notLong ? (
              <p className="error-message">
                <b>The min. length for the password is 4.</b>
              </p>
            ) : (
              sameUser && (
                <p className="error-message">
                  <b>User with same Email already exists.</b>
                </p>
              )
            )}
          </p>
          {successReg && (
            <p className="success-message">
              <b>Successfully registered Account.</b>
            </p>
          )}
        </div>
        <div className="register-form--button-create">
          <button
            type="submit"
            className="register-form--button-create__design"
          >
            Create Account
          </button>
        </div>
        <div className="register-form--button-back">
          <button
            type="submit"
            onClick={() => setGoLoginPage(true)}
            className="register-form--button-back__design"
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
