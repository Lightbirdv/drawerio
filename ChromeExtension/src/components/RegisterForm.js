import React, { useState } from "react";
import axios from "axios";
import "./RegisterForm.css";
import { set, useForm } from "react-hook-form";
import LoginForm from "./LoginForm";

const RegisterForm = function (props) {
  const [goLoginPage, setGoLoginPage] = useState(false);
  const [sameUser, setSameUser] = useState(false);
  const [successReg, setSuccessReg] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (goLoginPage) {
    return <LoginForm />;
  }

  return (
    <div className="register-form-container">
      <div className="register-form--text">
        <p>Registration</p>
      </div>
      <form
        className="register-form__design"
        onSubmit={handleSubmit((data) => {
          console.log(data);
          axios
            .post("http://localhost:5000/user/register", {
              email: data.email,
              password: data.password,
            })
            .then((response) => {
              console.log(response);
              setSameUser(false);
              setSuccessReg(true);
              setTimeout(() => {
                setGoLoginPage(true);
              }, 1000);
            })
            .catch((error) => {
              setSameUser(true);
            });
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
            {...register("password", {
              required: "This is required.",
              minLength: { value: 4, message: "The minimum length is 4." },
              maxLength: { value: 45, message: "The maximum length is 45" },
            })}
            placeholder="Password"
            className="register-form--password__design"
            size="45"
          />
          <p className="error-message">
            {errors.password?.message ? (
              <p className="error-message">
                <b>{errors.password?.message}</b>
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
