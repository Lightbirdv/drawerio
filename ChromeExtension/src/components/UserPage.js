import React, { useState } from "react";
import "./UserPage.css";
import cheerio from "cheerio";
import axios from "axios";
import LoginForm from "./LoginForm";

const UserPage = function () {
  const [allImages, setAllImages] = useState([]);
  const [grabUrl, setGrabUrl] = useState("");
  const [deleted, setDeleted] = useState(false);

  const textareaHandler = function (event) {
    setGrabUrl(event.target.value);
  };

  const logOut = () => {
    localStorage.clear();
    setDeleted(true);
  };

  if (deleted) {
    return <LoginForm />;
  }

  const grabHandler = function () {
    axios.get(grabUrl).then((res) => {
      const $ = cheerio.load(res.data);
      $("img", res.data).each((index, image) => {
        const IMAGESRC = $(image).attr("src");
        setAllImages((allImages) => [...allImages, { IMAGESRC }]);
      });
    });
  };

  console.log(allImages);
  return (
    <div>
      <button
        onClick={logOut}
        className="userpage-text--button-signout__design"
      >
        Sign out!
      </button>
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
          <button className="userpage-bottom--button-select__design">
            Choose Drawer &#709;
          </button>
          <button className="userpage-bottom--button-save__design">Save</button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
