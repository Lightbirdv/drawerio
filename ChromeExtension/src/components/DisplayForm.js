import React, { useState } from "react";
import LoginForm from "./LoginForm";
import UserPage from "./UserPage";

const DisplayForm = function () {
  if (localStorage.getItem("token")) {
    return <UserPage />;
  }

  return <LoginForm />;
};

export default DisplayForm;
