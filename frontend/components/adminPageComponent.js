import React, { useEffect, useState } from "react";
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



const adminPageComponent = () => {

  const router = useRouter();
  const forceReload = () => {
    router.reload();
  }

  const [state, setState] = useState({ drawerName: '' })
  const [newDrawName, setName] = useState('');
  const [newDime, setDime] = useState('');
  const [newUid, setUid] = useState('');


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showUpd, setShowUpd] = useState(false);
  const handleCloseUpd = () => setShowUpd(false);
  const handleShowUpd = () => setShowUpd(true);

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleDeleteShow = () => setShowDelete(true);



  const handleChange = event => {
    setState({ [event.target.name]: event.target.value });
    console.log(event.target.name)
  }
  const handleName = event => {
    setName({ newName: event.target.value });
    console.log(event.target.name)
  }
  const handledime = event => {
    setDime({ dime: event.target.value });
    console.log(event.target.name)
  }
  const handleUid = event => {
    setUid({ userID: event.target.value });
    console.log(event.target.name)
  }


  const handleSubmit = event => {
    const { drawerName } = state;
    console.log(drawerName)
    addDrawer(localStorage.getItem('token'), drawerName)
    forceReload();
  }

  const handleUpdate = (e, _id) => {
    const { newName } = newDrawName;
    const { dime } = newDime;
    const { userID } = newUid;
    e.preventDefault();
    console.log(newName, dime, userID, _id)
    updateDrawer(newName, dime, userID, _id)
    forceReload();
  }

  const deleteDrawer = (e, _id) => {
    e.preventDefault();
    deleteD(_id)
    forceReload();
  }

  const goNext = (e, _id) => {
    e.preventDefault();
    localStorage.setItem("drawer_id", _id);
    localStorage.getItem("drawer_id")
    Router.push("/thirdpage")
  }

  const goToUserManagement = (e) => {
    e.preventDefault();
    Router.push("/userpage")
  }


  const [get, setPosts] = useState({ blogs: [] });

  useEffect(() => {
    const fetchPostList = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/drawer/all/user", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },

      });
      setPosts({ blogs: data });
      console.log(data);
    };
    fetchPostList();
  }, [setPosts]);

  /* Searchinput */
  const [searchTerm, setSearchTerm] = useState('');

  /* Name */
  /* let token = localStorage.getItem("token");
  let decodedToken = jwtDecode(token);
  const name = decodedToken.email; */

  return (

    <div style={{ marginTop: "20px" }}>
      <h1></h1>
      {/* Searchfield */}
      <input type="text" placeholder="Search..." onChange={event => { setSearchTerm(event.target.value) }} style={{ margin: "10px", width: "200px", height: "30px", paddingLeft: "10px", fontSize: "15px" }} />
      <ReactBootStrap.Table striped bordered hover>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Title</th>
            <th>Date</th>
            <th><button type="button" class="btn btn-secondary" onClick={handleShow} style={{marginRight:"10px"}}><MdAdd /></button>

               <button type="button" className="btn btn-secondary" onClick={goToUserManagement}style={{backgroundColor: "purple"}}><MdSupervisorAccount/></button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3" id="drawerName">
                      <Form.Label>Set a Name</Form.Label>
                      <Form.Control id="drawerNew" type="text" placeholder="new Drawer Name" name='drawerName' onChange={handleChange} />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    <MdClose />
                  </Button>
                  <Button variant="primary"
                    onClick={(e) => { handleSubmit(); handleClose() }} >
                    <MdCheck />
                  </Button>
                </Modal.Footer>
              </Modal></th>
          </tr>
        </thead>
        <tbody>
          {get.blogs &&
            get.blogs.filter((item) => {
              if (searchTerm == "") {
                return item
              } else if (item.drawertitle.toLowerCase().includes(searchTerm.toLowerCase())) {
                return item
              }
            }
            ).map((item) => (
              <tr key={item.id}>
                {/*  <td>{item.drawer_id}</td> */}
                <td>{item.drawertitle}</td>
                <td>{dayjs(item.creationdate).format('MMM, D, YYYY')}</td>
                <td><button type="button" class="btn btn-success" style={{ marginRight: "10px" }} onClick={(e) => { { goNext(e, item.drawer_id) } }}><MdOpenInNew /></button>
                  <button type="button" class="btn btn-warning" style={{ marginRight: "10px" }} onClick={handleShowUpd}><MdOutlineModeEdit /></button>
                  <Modal show={showUpd} onHide={handleCloseUpd}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group className="mb-3" id="updateName">
                          <Form.Label>New Name</Form.Label>
                          <Form.Control id="drawerNew" type="text" placeholder={item.drawertitle} name="newName" onChange={handleName} />
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseUpd}>
                        <MdClose />
                      </Button>
                      <Button variant="primary"
                        onClick={(e) => { handleUpdate(e, item.drawer_id); handleCloseUpd() }} >
                        <MdCheck />
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  {/* <button type="button" class="btn btn-danger" onClick={(e) => deleteDrawer(e, item.drawer_id)}><MdDeleteForever/></button> */}
                  <button type="button" class="btn btn-danger" style={{ marginRight: "10px" }} onClick={handleDeleteShow}><MdDeleteForever /></button>
                  <Modal show={showDelete} onHide={handleCloseDelete}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Are you sure you want to permanently delete {item.drawertitle}?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseDelete}>
                        <MdClose />
                      </Button>
                      <Button variant="primary"
                        onClick={(e) => { deleteDrawer(e, item.drawer_id); handleCloseDelete() }}>
                        <MdCheck />
                      </Button>
                    </Modal.Footer>
                  </Modal>

                </td>
              </tr>
            ))}
        </tbody>
      </ReactBootStrap.Table>
    </div>
  );
};

export default adminPageComponent;
