import React, { useEffect, useState, useReducer } from "react";
import * as ReactBootStrap from "react-bootstrap";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Router from 'next/router';
import { useRouter } from 'next/router';
import { addDrawer } from '../lib/newDrawer';
import { updateDrawer } from "../lib/updateDrawer";
import { deleteD } from "../lib/deleteD";
import dayjs from 'dayjs';
import jwtDecode from "jwt-decode";
import { MdAdd } from "react-icons/md";
import { MdOpenInNew } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { MdCheck } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { MdSupervisorAccount } from "react-icons/md";
import { Col, Container, Row } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { confirmEmail } from '../lib/confirmMail'
import { search } from "../lib/search";
import { searchDrawer } from "../lib/searchDrawer";



const AdminPageComponent = () => {

  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const [state, setState] = useState({ drawerName: "" });
  const [newDrawName, setName] = useState("");
  const [newDime, setDime] = useState("");
  const [newUid, setUid] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showUpd, setShowUpd] = useState(false);
  const handleCloseUpd = () => setShowUpd(false);
  const handleShowUpd = () => setShowUpd(true);

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleDeleteShow = () => setShowDelete(true);

  const handleChange = (event) => {
    setState({ [event.target.name]: event.target.value });
    /* console.log(event.target.name); */
  };

  const handleName = (event) => {
    setName({ newName: event.target.value });
    /* console.log(event.target.name); */
  };

  const handleSubmit = (event) => {
    const { drawerName } = state;
    /* console.log(drawerName); */
    addDrawer(localStorage.getItem("token"), drawerName);
    forceUpdate();
  };

  const handleUpdate = (e, _id) => {
    const { newName } = newDrawName;
    const { dime } = newDime;
    const { userID } = newUid;
    e.preventDefault();
    /*  console.log(newName, dime, userID, _id); */
    updateDrawer(newName, dime, userID, _id);
    forceUpdate();
  };

  const deleteDrawer = (e, _id) => {
    e.preventDefault();
    deleteD(_id);
    forceUpdate();
  };

  const goNext = (e, _id, name) => {
    e.preventDefault();
    localStorage.setItem("drawer_id", _id);
    localStorage.getItem("drawer_id");

    Router.push(`/drawerentry?drawertitle=${name}`);
  };

  const goToUserManagement = (e) => {
  e.preventDefault();
  Router.push("/usermanagement")
  }

  const [get, setPosts] = useState({ blogs: [] });
  useEffect(() => {
    const fetchPostList = async () => {

      const { data } = await axios.get(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_API_PORT + "drawer/all/user", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setPosts({ blogs: data });
    };
    fetchPostList();
  }, [reducerValue]);

  /* Searchinput */
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermEntrys, setSearchTermEntrys] = useState("");

  const [x, y] = useState({ blogs2: [] });


  const saveDrawer = (e, _id) => {
    e.preventDefault();
    localStorage.setItem("drawer_id", _id);
  };

  const saveDrawerName = (e, _name) => {
    e.preventDefault();
    localStorage.setItem("drawerName", _name);
  };



  const handleKeyDown = event => {
    console.log('User pressed: ', event.key);
    if (event.key === 'Backspace') {
      console.log('Backspace key pressed ???');
    }
  };



  return (
    <div>
      <div className="flex flex-column m-auto w-4/6">
        <div className="flex flex-row items-center mb-12 mt-12">
          <input
            className="mr-2"
            type="text"
            placeholder="Search..."
            onChange={(event) => {
              setSearchTerm(event.target.value);
              const b = searchDrawer(event.target.value);
              get.blogs = b;
            }}
            onKeyDown={(event) => {
              handleKeyDown
              let b;
              if (searchTerm.slice(1) == "") {
                b = searchDrawer("");
                forceUpdate();
                get.blogs = b;
              } else {
                b = searchDrawer(event.target.value);
                get.blogs = b;
              }
              get.blogs = b;
            }}
            style={{
              width: "300px",
              height: "35px",
              paddingLeft: "10px",
              fontSize: "15px",
              borderRadius: "10px",
            }}
          />

          <input
            className="mr-2"
            type="text"
            placeholder="Search in entrys..."
            onChange={(event) => {
              setSearchTermEntrys(event.target.value);
              const a = search(event.target.value);
              x.blogs2 = a;
            }}
            onKeyDown={handleKeyDown}
            style={{
              width: "300px",
              height: "35px",
              paddingLeft: "10px",
              fontSize: "15px",
              borderRadius: "10px",
            }}
          />
          <button type="button" className="bg-main text-white w-12 h-8 text-xl text-center" onClick={handleShow} style={{ borderRadius: "10px", backgroundColor: "#3CDDC0", color: "white" }}>
            +
          </button>
          <button 	type="button"
											className="bg-main flex justify-center items-center text-white w-12 h-8 text-xl text-center"
											 onClick={goToUserManagement} style={{ marginLeft: "5px", borderRadius: "10px", backgroundColor: "#3CDDC0", color: "white" }}><MdSupervisorAccount/></button>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new Drawer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" id="drawerName">
                <Form.Label>Set a Name</Form.Label>
                <Form.Control id="drawerNew" type="text" placeholder="new Drawer Name" name="drawerName" onChange={handleChange} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} style={{ borderRadius: "15px" }}>
              <MdClose />
            </Button>
            <Button
              variant="primary"
              onClick={(e) => {
                handleSubmit();
                handleClose();
              }}
              style={{ borderRadius: "15px" }}
            >
              <MdCheck />
            </Button>
          </Modal.Footer>
        </Modal>



        {x.blogs2 &&
          x.blogs2.filter((item) => {
            const keys = ["comment", "originurl", "seltext", "websitecontent"]
            if (searchTermEntrys == "") {
              return null
            } else if (keys.some((key) => item[key].toLowerCase().includes(searchTermEntrys.toLowerCase())) || dayjs(item.creationdate).format('MMM, D, YYYY').toLowerCase().includes(searchTermEntrys.toLowerCase())) {
              return item
            }
          })
            .map((item) => (
              <div className="flex flex-row justify-between my-1 p-2 bg-white hover:bg-gray-200 rounded-xl items-center shadow-sm" key={item.id}>
                <div
                  className="ml-4"
                  style={{ width: "40px", height: "40px", border: "1px solid rgb(0,0,0, .2)", backgroundColor: "white", borderRadius: "50%" }}
                ></div>

                <div
                  className="ml-8 w-3/6"
                  onClick={(e) => {
                    {
                      goNext(e, item.drawer_id, item.drawertitle);
                    }
                  }}
                >
                  <a style={{ color: "black" }} className="m-auto cursor-pointer hover:no-underline text-xl text-text hover:text-gray-400">{item.comment}</a>
                </div>

                <div className="flex flex-row">
                  <span className="mr-8">{dayjs(item.creationdate).format("MMM, DD, YYYY")}</span>

                  <span>
                    <button
                      type="button"
                      className="btn mr-2"
                      style={{ borderRadius: "10px", backgroundColor: "#3CDDC0", color: "white" }}
                      onClick={(e) => {
                        saveDrawerName(e, item.drawertitle);
                        saveDrawer(e, item.drawer_id);
                        handleShowUpd();
                      }}
                    >
                      <MdOutlineModeEdit />
                    </button>
                    <Modal show={showUpd} onHide={handleCloseUpd}>
                      <Modal.Header closeButton>
                        <Modal.Title>Update Drawer</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group className="mb-3" id="updateName">
                            <Form.Label>New Name</Form.Label>
                            <Form.Control
                              id="drawerNew"
                              type="text"
                              placeholder={localStorage.getItem("drawerName")}
                              name="newName"
                              onChange={handleName}
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseUpd} style={{ borderRadius: "15px" }}>
                          <MdClose />
                        </Button>
                        <Button
                          variant="primary"
                          onClick={(e) => {
                            handleUpdate(e, localStorage.getItem("drawer_id"));
                            handleCloseUpd();
                          }}
                          style={{ borderRadius: "15px" }}
                        >
                          <MdCheck />
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <button
                      type="button"
                      className="btn btn-danger mr-4"
                      style={{ borderRadius: "10px" }}
                      onClick={(e) => {
                        saveDrawerName(e, item.drawertitle);
                        saveDrawer(e, item.drawer_id);
                        handleDeleteShow();
                      }}
                    >
                      <MdDeleteForever />
                    </button>
                    <Modal show={showDelete} onHide={handleCloseDelete}>
                      <Modal.Header closeButton>
                        <Modal.Title>Delete Drawer</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>Are you sure you want to permanently delete {localStorage.getItem("drawerName")} ?</Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDelete} style={{ borderRadius: "15px" }}>
                          <MdClose />
                        </Button>
                        <Button
                          variant="primary"
                          onClick={(e) => {
                            deleteDrawer(e, localStorage.getItem("drawer_id"));
                            handleCloseDelete();
                          }}
                          style={{ borderRadius: "15px" }}
                        >
                          <MdCheck />
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </span>
                </div>
              </div>
            ))}








        {/* {get.blogs &&
          get.blogs.filter((x) => {
            <div key={x.drawer_id}></div>
            if (searchTerm == "" && searchTermEntrys == "") {
              return x
            }
            else if (searchTermEntrys !== "" && searchTerm == "") {
              return null
            } else {
              return x
            }
          }) */}

        {get.blogs &&
          get.blogs.filter((item) => {
            <div key={x.drawer_id}></div>
            if (searchTerm == "" && searchTermEntrys == "") {
              return item
            }
            else if (searchTermEntrys !== "" && searchTerm == "") {
              return null
            } else if (item.drawertitle.toLowerCase().includes(searchTerm.toLowerCase()) || dayjs(item.creationdate).format('MMM, D, YYYY').toLowerCase().includes(searchTerm.toLowerCase())) {
              return item
            }
          })
            .map((item) => (
              <div className="flex flex-row justify-between my-1 p-2 bg-white hover:bg-gray-200 rounded-xl items-center shadow-sm" key={item.drawer_id}>
                <div
                  className="ml-4"
                  style={{ width: "40px", height: "40px", border: "1px solid rgb(0,0,0, .2)", backgroundColor: "white", borderRadius: "50%" }}
                ></div>

                <div
                  className="ml-8 w-3/6"
                  onClick={(e) => {
                    {
                      goNext(e, item.drawer_id, item.drawertitle);
                    }
                  }}
                >
                  <a style={{ color: "black" }} className="m-auto cursor-pointer hover:no-underline text-xl text-text hover:text-gray-400">{item.drawertitle}</a>
                </div>

                <div className="flex flex-row">
                  <span className="mr-8">{dayjs(item.creationdate).format("MMM, DD, YYYY")}</span>

                  <span>
                    <button
                      type="button"
                      className="btn mr-2"
                      style={{ borderRadius: "10px", backgroundColor: "#3CDDC0", color: "white" }}
                      onClick={(e) => {
                        saveDrawerName(e, item.drawertitle);
                        saveDrawer(e, item.drawer_id);
                        handleShowUpd();
                      }}
                    >
                      <MdOutlineModeEdit />
                    </button>
                    <Modal show={showUpd} onHide={handleCloseUpd}>
                      <Modal.Header closeButton>
                        <Modal.Title>Update Drawer</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group className="mb-3" id="updateName">
                            <Form.Label>New Name</Form.Label>
                            <Form.Control
                              id="drawerNew"
                              type="text"
                              placeholder={localStorage.getItem("drawerName")}
                              name="newName"
                              onChange={handleName}
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseUpd} style={{ borderRadius: "15px" }}>
                          <MdClose />
                        </Button>
                        <Button
                          variant="primary"
                          onClick={(e) => {
                            handleUpdate(e, localStorage.getItem("drawer_id"));
                            handleCloseUpd();
                          }}
                          style={{ borderRadius: "15px" }}
                        >
                          <MdCheck />
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <button
                      type="button"
                      className="btn btn-danger mr-4"
                      style={{ borderRadius: "10px" }}
                      onClick={(e) => {
                        saveDrawerName(e, item.drawertitle);
                        saveDrawer(e, item.drawer_id);
                        handleDeleteShow();
                      }}
                    >
                      <MdDeleteForever />
                    </button>
                    <Modal show={showDelete} onHide={handleCloseDelete}>
                      <Modal.Header closeButton>
                        <Modal.Title>Delete Drawer</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>Are you sure you want to permanently delete {localStorage.getItem("drawerName")} ?</Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDelete} style={{ borderRadius: "15px" }}>
                          <MdClose />
                        </Button>
                        <Button
                          variant="primary"
                          onClick={(e) => {
                            deleteDrawer(e, localStorage.getItem("drawer_id"));
                            handleCloseDelete();
                          }}
                          style={{ borderRadius: "15px" }}
                        >
                          <MdCheck />
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};


export default AdminPageComponent;
