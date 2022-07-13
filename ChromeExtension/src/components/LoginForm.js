import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./LoginForm.css";
import UserPage from "./UserPage";
import RegisterForm from "./RegisterForm";
import PasswordForget from "./PasswordForget";

const LoginForm = function (props) {
  const [goUserPage, setGoUserPage] = useState(false);
  const [goRegPage, setGoRegPage] = useState(false);
  const [wrongLogin, setWrongLogin] = useState(false);
  const [goForgot, setGoForgot] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (goForgot) {
    return <PasswordForget />;
  }

  if (goRegPage) {
    return <RegisterForm />;
  }

  if (goUserPage) {
    return <UserPage />;
  }

  return (
    <div className="login-form-container">
      <div className="fun-drawer">
        <iframe
          src="https://my.spline.design/untitled-81eb2f21c45dd6cb1bc7432360ae7e69/"
          frameborder="0"
          width="100%"
          height="200px"
        ></iframe>
      </div>
      <div className="login-form--text">
        <p>Hello, please log in!</p>
      </div>

      <form
        className="login-form__design"
        onSubmit={handleSubmit((data) => {
          axios
            .post("http://localhost:5000/auth/login", {
              email: data.email,
              password: data.password,
            })
            .then((response) => {
              if (response.data.token !== null) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem(
                  "refreshToken",
                  response.data.user.refreshtoken
                );
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
          <a
            onClick={(event) => {
              event.preventDefault();
              setGoForgot(true);
            }}
            href="#"
            className="login-form--password-forgot"
          >
            Forgot Password?
          </a>
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
