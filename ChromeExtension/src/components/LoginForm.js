import React, { useState } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";
import "./LoginForm.css";
import UserPage from "./UserPage";
import RegisterForm from "./RegisterForm";

const LoginForm = function (props) {
  const [goUserPage, setGoUserPage] = useState(false);
  const [goRegPage, setGoRegPage] = useState(false);
  const [wrongLogin, setWrongLogin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (goRegPage) {
    return <RegisterForm />;
  }

  if (goUserPage) {
    return <UserPage />;
  }

  return (
    <div className="login-form-container">
      <div className="login-form--text">
        <p>Hello, please log in!</p>
      </div>
      <form
        className="login-form__design"
        onSubmit={handleSubmit((data) => {
          console.log(data);
          axios
            .post("http://localhost:5000/auth/login", {
              email: data.email,
              password: data.password,
            })
            .then((response) => {
              console.log(response);
              if (response.data !== null) {
                localStorage.setItem("token", response.data);
              }
              if (localStorage.getItem("token")) {
                setGoUserPage(true);
              }
            })
            .catch((error) => {
              setWrongLogin(true);
            });
        })}
      >
        <div className="login-form--email">
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
            className="login-form--email__design"
            size="45"
          />
          <p className="error-message">
            <b>{errors.email?.message}</b>
          </p>
        </div>
        <div className="login-form--password">
          <input
            type="password"
            {...register("password", {
              required: "This is required.",
              minLength: { value: 4, message: "The minimum length is 4." },
              maxLength: { value: 45, message: "The maximum length is 45" },
            })}
            placeholder="Password"
            className="login-form--password__design"
            size="45"
          />
          <p className="error-message">
            {errors.password?.message ? (
              <p className="error-message">
                <b>{errors.password?.message}</b>
              </p>
            ) : (
              wrongLogin && (
                <p className="error-message">
                  <b>Wrong Email or Password.</b>
                </p>
              )
            )}
          </p>
        </div>

        <button type="submit" className="login-form--button-login__design">
          Log In
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            setGoRegPage(true);
          }}
          className="login-form--button-register__design"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
