import React, { useState } from "react";
import axios from "axios";
import "./RegisterForm.css";
import { useForm } from "react-hook-form";

const RegisterForm = function (props) {
  const [loadPage, setLoadPage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <div className="register-form--text">
        <p>Registration</p>
      </div>
      <form
        className="register-form__design"
        onSubmit={handleSubmit((data) => {
          setLoadPage(true);
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
            <b>{errors.password?.message}</b>
          </p>
        </div>
        <div className="register-form--button-create">
          <button
            type="submit"
            onClick={loadPage && props.onBackSite}
            className="register-form--button-create__design"
          >
            Create Account
          </button>
        </div>
        <div className="register-form--button-back">
          <button
            type="submit"
            onClick={props.onBackSite}
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
