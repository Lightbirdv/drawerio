import React, { useEffect, useState } from "react";
import "./UserPage.css";
import cheerio from "cheerio";
import axios from "axios";
import LoginForm from "./LoginForm";
import jwtDecode from "jwt-decode";

const UserPage = function () {
  const [allImages, setAllImages] = useState([]);
  const [grabUrl, setGrabUrl] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [drawer, setDrawer] = useState([]);
  const [textfieldInput, setTextfieldInput] = useState("");
  const [optionValue, setOptionValue] = useState({ id: "Select Drawer..." });
  var imgArr = [];
  var date = new Date();

  const textareaHandler = function (event) {
    setGrabUrl(event.target.value);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setDeleted(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/drawer/all/user", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => setDrawer(response.data.rows));
  }, []);

  const handleClick = function (event) {
    event.preventDefault();
    for (let i = 0; i < allImages.length; i++) {
      imgArr[i] = allImages[i].IMAGESRC;
    }
    if (optionValue.id !== "Select Drawer..." && allImages.length !== 0) {
      axios
        .post("http://localhost:5000/drawerentry/add", {
          comment: textfieldInput,
          imageURL: imgArr,
          drawer_id: optionValue.id,
        })
        .then((response) => console.log(response));
    }
  };

  const handleChange = function (event) {
    setOptionValue({ id: event.target.value });
  };

  if (deleted) {
    return <LoginForm />;
  }

  if (localStorage.getItem("token") !== null) {
    let token = localStorage.getItem("token");
    let decodedToken = jwtDecode(token);

    if (
      decodedToken.exp * 1000 < date.getTime() &&
      localStorage.getItem("token") !== null
    ) {
      axios
        .post(
          "http://localhost:5000/auth/token",
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => localStorage.setItem("token", response.data));
    }
  }

  const handleTextinput = function (event) {
    setTextfieldInput(event.target.value);
  };

  const grabHandler = function () {
    axios.get(grabUrl).then((res) => {
      const $ = cheerio.load(res.data);
      $("img", res.data).each((index, image) => {
        const IMAGESRC = $(image).attr("src");
        setAllImages((allImages) => [...allImages, { IMAGESRC }]);
      });
    });
  };

  return (
    <div>
      <button
        onClick={logOut}
        className="userpage-text--button-signout__design"
      >
        Sign out!
      </button>
      <select className="userpage-top--list__design" onChange={handleChange}>
        <option>Select Drawer...</option>
        {drawer.map((alldrawer) => (
          <option
            key={alldrawer.drawer_id}
            onSelect={handleChange}
            value={alldrawer.drawer_id}
          >
            {alldrawer.drawertitle}
          </option>
        ))}
      </select>
      <input
        name="http"
        type="url"
        placeholder="URL"
        size="45"
        className="userpage-text--url__design"
        onChange={textareaHandler}
      />
      <button
        className="userpage-text--button-grab__design"
        onClick={grabHandler}
      >
        Grab!
      </button>
      <p className="comment-text__design">Comment:</p>
      <div className="userpage-textarea">
        <textarea
          className="userpage-textarea__design"
          placeholder="Your text..."
          onChange={handleTextinput}
          rows={7}
          cols={50}
        ></textarea>
      </div>
      {allImages.map((images) => (
        <div className="userpage-middle">
          <img
            className="userpage-middle--images__design"
            src={images.IMAGESRC}
          ></img>
        </div>
      ))}
      <div className="down-site">
        <div className="userpage-bottom--button">
          <button
            className="userpage-bottom--button-save__design"
            onClick={handleClick}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
