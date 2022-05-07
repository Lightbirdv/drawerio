import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./LoginForm.css";

const LoginForm = function (props) {
  const [loadPage, setLoadPage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <div className="login-form--text">
        <p>Hello, please log in!</p>
      </div>
      <form
        className="login-form__design"
        onSubmit={handleSubmit((data) => {
          setLoadPage(true);
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
            <b>{errors.password?.message}</b>
          </p>
        </div>
        <div className="login-form--password-forgot">
          <a href="" className="login-form--password-forgot__design">
            Forgot password?
          </a>
        </div>
        <div className="login-form--button-login">
          <button
            type="submit"
            onClick={loadPage && props.onUserPage}
            className="login-form--button-login__design"
          >
            Log In
          </button>
        </div>
        <div className="login-form--button-register">
          <button
            type="submit"
            onClick={props.onChangeSite}
            className="login-form--button-register__design"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
