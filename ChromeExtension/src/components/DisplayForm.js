import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import UserPage from "./UserPage";

const DisplayForm = function () {
  const [isClick, setIsClicked] = useState(false);
  const [pageChange, setPageChange] = useState(false);

  const isChangedPageHandler = function (event) {
    event.preventDefault();
    setPageChange(true);
  };

  const isGoClickedHandler = function (event) {
    event.preventDefault();
    setIsClicked(true);
  };

  const isBackClickedHandler = function (event) {
    event.preventDefault();
    setIsClicked(false);
  };

  if (!isClick && !pageChange) {
    return (
      <LoginForm
        onChangeSite={isGoClickedHandler}
        onUserPage={isChangedPageHandler}
      />
    );
  }

  if (pageChange) {
    return <UserPage />;
  }

  if (isClick) {
    return (
      <RegisterForm
        onChangeSite={isGoClickedHandler}
        onBackSite={isBackClickedHandler}
      />
    );
  }
};

export default DisplayForm;
