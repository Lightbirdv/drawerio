/*global chrome*/
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./UserPage.css";
import axios from "axios";
import LoginForm from "./LoginForm";
import DrawerForm from "./DrawerForm";
import jwtDecode from "jwt-decode";
import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";
import logoutImage from "../imagesProject/logout.svg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const UserPage = function () {
  const [allImages, setAllImages] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [createDrawer, setCreateDrawer] = useState(false);
  const [successSaved, setSuccessSave] = useState(false);
  const [drawer, setDrawer] = useState([]);
  const [textfieldInput, setTextfieldInput] = useState("");
  const [optionValue, setOptionValue] = useState(0);
  const [tabURL, setTabURL] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [selectImgArr, setSelectImgArr] = useState([]);
  const [isYoutube, setIsYoutube] = useState(false);
  const [runOnce, setRunOnce] = useState(true);
  const [sendYoutube, setSendYoutube] = useState([]);
  const [checked, setChecked] = useState(false);
  const [currentValues, setCurrentValues] = useState([]);

  var imgArr = [];
  var date = new Date();

  useEffect(async () => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    setTabURL(tab.url);
    let result;
    let resultTwo;
    let resultThree;

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
      resultThree = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
          const videos = document.querySelectorAll("iframe");
          const videosResult = [];
          videos.forEach(function (video) {
            if (
              video.src.startsWith("https://www.youtube.com/embed") ||
              video.src.startsWith("https://www.youtube-nocookie.com/embed") ||
              video.src.startsWith("https://youtube.com/embed") ||
              video.src.startsWith("http://www.youtube-nocookie.com/embed") ||
              video.src.startsWith("http://www.youtube.com/embed") ||
              video.src.startsWith("http://youtube.com/embed") ||
              video.src.startsWith("//www.youtube-nocookie.com/embed") ||
              video.src.startsWith("//www.youtube.com/embed") ||
              video.src.startsWith("//youtube.com/embed")
            ) {
              videosResult.push(video.src);
            }
          });
          return videosResult;
        },
      });
    } catch (e) {
      console.log(e);
      return;
    }

    setSelectedText(result);
    setAllImages([...resultTwo[0].result]);
    setAllVideos([...resultThree[0].result]);
    return tab;
  }, []);

  function onPick(image) {
    setSelectImgArr(image);
  }

  const handleCheck = function (youtubeURL, event) {
    if (event.target.checked) {
      setChecked(true);
      if (sendYoutube.includes(youtubeURL)) {
        console.log("already in");
      } else {
        setSendYoutube([...sendYoutube, youtubeURL]);
        setCurrentValues([...currentValues, event.target.value]);
      }
    } else if (!event.target.checked) {
      setSendYoutube([...sendYoutube.filter((urls) => urls !== youtubeURL)]);
      setCurrentValues([
        ...currentValues.filter(
          (currentValue) => currentValue !== event.target.value
        ),
      ]);
      setChecked(false);
    }
  };
  console.log(sendYoutube);
  console.log(currentValues);

  const logOut = () => {
    localStorage.removeItem("token");
    setDeleted(true);
  };

  const goToDrawer = () => {
    setCreateDrawer(true);
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
        setOptionValue(parseInt(response.data[0].drawer_id));
        console.log(response.data[0].drawer_id);
      });
  }, []);

  const handleClick = function (event) {
    event.preventDefault();
    for (let i = 0; i < selectImgArr.length; i++) {
      imgArr[i] = selectImgArr[i].src;
    }
    axios
      .post(
        "http://localhost:5000/drawerentry/add",
        {
          comment: textfieldInput,
          imageURL: imgArr,
          videoURL: sendYoutube,
          drawer_id: optionValue,
          originURL: tabURL,
          selText: selectedText,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setSuccessSave(true);
        console.log(response);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setTimeout(() => {
          window.close();
        }, 2000);
      });
  };

  const handleChange = function (event) {
    const integerID = parseInt(event.target.value);
    setOptionValue(integerID);
  };

  if (deleted) {
    return <LoginForm />;
  }

  if (createDrawer) {
    return <DrawerForm />;
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

  if (runOnce && tabURL?.startsWith("https://www.youtube.com/watch")) {
    const firstYouTubeID = tabURL.split("v=");
    if (firstYouTubeID[1].includes("&")) {
      const secondYouTubeID = firstYouTubeID[1].split("&");
      setSendYoutube(`https://www.youtube.com/embed/${secondYouTubeID[0]}`);
      setIsYoutube(true);
      setRunOnce(false);
      console.log(secondYouTubeID);
    } else if (firstYouTubeID[1].includes("?")) {
      const thirdYoutubeID = firstYouTubeID[1].split("?");
      setSendYoutube(`https://www.youtube.com/embed/${thirdYoutubeID[0]}`);
      setIsYoutube(true);
      setRunOnce(false);
      console.log(thirdYoutubeID);
    } else {
      setSendYoutube(`https://www.youtube.com/embed/${firstYouTubeID[1]}`);
      setIsYoutube(true);
      setRunOnce(false);
    }
  }

  console.log(sendYoutube);

  const handleTextinput = function (event) {
    setTextfieldInput(event.target.value);
  };

  return (
    <div>
      <div className="user-page-container">
        <button
          onClick={logOut}
          className="userpage-text--button-signout__design"
        >
          <p>logout</p>
          <img
            src={logoutImage}
            alt="logout svg"
            className="userpage-image--signout-image"
          ></img>
        </button>
        <div className="userpage-drawer--container">
          <button
            onClick={goToDrawer}
            className="userpage-text--button-plus__design"
          >
            <p>+</p>
          </button>
          <select
            className="userpage-top--list__design"
            onChange={handleChange}
          >
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
        </div>
        {successSaved && (
          <p className="success-message">
            <b>Saved successfully!</b>
          </p>
        )}
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
        <p className="comment-text__design">Your selected Text:</p>
        <div className="userpage-textarea">
          <Tippy content="If you highlight a section of text on a website, it will appear here in the text box.">
            <p className="userpage-tooltip">{"[?]"}</p>
          </Tippy>
          <textarea
            className="userpage-textareaSelect__design"
            placeholder={selectedText}
            readOnly={true}
            rows={20}
            cols={50}
          ></textarea>
        </div>
        <div className="userpage-imagearea">
          <ImagePicker
            images={allImages.map((image, i) => ({
              src: image,
              value: i,
            }))}
            onPick={onPick}
            multiple
          />
        </div>
        {isYoutube && (
          <div className="userpage-video-player">
            <iframe
              width="300"
              height="300"
              src={sendYoutube}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        )}
        {allVideos.map((video, i) => (
          <div
            className="userpage-video-player"
            style={{
              backgroundColor:
                checked && currentValues.includes(i.toString())
                  ? "#3cddc0"
                  : "white",
              border:
                checked && currentValues.includes(i.toString())
                  ? "10px solid"
                  : "",
              borderColor:
                checked && currentValues.includes(i.toString())
                  ? "#3cddc0"
                  : "",
              borderRadius:
                checked && currentValues.includes(i.toString()) ? "10px" : "",
            }}
          >
            <input
              type="checkbox"
              className="userpage-video-player-checkbox"
              onChange={(event) => handleCheck(video, event)}
              value={i}
            />
            <iframe
              value={i}
              width="300"
              height="300"
              src={video}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
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
    </div>
  );
};

export default UserPage;
