/*global chrome*/
import React, { useEffect, useState } from "react";
import "./UserPage.css";
import axios from "axios";
import LoginForm from "./LoginForm";
import jwtDecode from "jwt-decode";
import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";

const UserPage = function () {
  const [allImages, setAllImages] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [drawer, setDrawer] = useState([]);
  const [textfieldInput, setTextfieldInput] = useState("");
  const [optionValue, setOptionValue] = useState({ id: "Select Drawer..." });
  const [tabURL, setTabURL] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [selectImgArr, setSelectImgArr] = useState([]);
  var imgArr = [];
  var date = new Date();

  useEffect(async () => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    setTabURL(tab.url);
    let result;
    let resultTwo;

    try {
      [{ result }] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => getSelection().toString(),
      });
      resultTwo = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
          const images = document.querySelectorAll("img");
          const imagesResult = [];
          images.forEach(function (image) {
            if (image.src.startsWith("http")) {
              imagesResult.push(image.src);
            }
          });
          return imagesResult;
        },
      });
    } catch (e) {
      console.log(e);
      return;
    }
    setSelectedText(result);
    console.log(resultTwo[0].result);
    setAllImages([...resultTwo[0].result]);
    console.log(resultTwo);
    console.log(result);
    return tab;
  }, []);

  console.log(selectedText);

  function onPick(image) {
    setSelectImgArr(image);
  }

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
      .then((response) => {
        setDrawer(response.data);
      });
  }, []);

  const handleClick = function (event) {
    event.preventDefault();
    for (let i = 0; i < selectImgArr.length; i++) {
      imgArr[i] = selectImgArr[i].src;
    }

    console.log(selectImgArr);
    if (tabURL !== "" && optionValue.id !== "Select Drawer...") {
      axios
        .post(
          "http://localhost:5000/drawerentry/add",
          {
            comment: textfieldInput,
            imageURL: imgArr,
            drawer_id: optionValue.id,
            originURL: tabURL,
            selText: selectedText,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
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

  /*
  const grabHandler = function () {
    axios.get(tabURL).then((res) => {
      const $ = cheerio.load(res.data);
      console.log($("img"));
      $("img").each((index, image) => {
        const IMAGESRC = $(image).attr("src");
        setAllImages((allImages) => [...allImages, { IMAGESRC }]);
      });
    });
  };*/

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
      <ImagePicker
        images={allImages.map((image, i) => ({
          src: image,
          value: i,
        }))}
        onPick={onPick}
        multiple
      />
      {/* {allImages.map((images) => (
        <div className="userpage-middle">
          <img
            className="userpage-middle--images__design"
            src={images.IMAGESRC}
          ></img>
        </div>
      ))} */}
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
