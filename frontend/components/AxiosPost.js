import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Router from 'next/router';
import { addDrawer } from '../lib/newDrawer';
import { updateDrawer } from "../lib/updateDrawer";
import { deleteD } from "../lib/deleteD";
import dayjs from 'dayjs';
import { MdAdd } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { MdCheck } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { Col, Container, Row } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import {confirmEmail} from '../lib/confirmMail'




const AxiosPost = () => {

  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

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


  const handleSubmit = event => {
    const { drawerName } = state;
    console.log(drawerName)
    addDrawer(localStorage.getItem('token'), drawerName)
    forceUpdate();
  }

  const handleUpdate = (e, _id) => {
    const { newName } = newDrawName;
    const { dime } = newDime;
    const { userID } = newUid;
    e.preventDefault();
    console.log(newName, dime, userID, _id)
    updateDrawer(newName, dime, userID, _id)
    forceUpdate();
  }

  const deleteDrawer = (e, _id) => {
    e.preventDefault();
    deleteD(_id)
    forceUpdate();
  }

  const goNext = (e, _id) => {
    e.preventDefault();
    localStorage.setItem("drawer_id", _id);
    localStorage.getItem("drawer_id")
    Router.push("/thirdpage")
  }

  /* const goToUserManagement = (e) => {
    e.preventDefault();
    Router.push("/userpage")
  } */


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

  }, [reducerValue]);

  /* Searchinput */
  const [searchTerm, setSearchTerm] = useState('');

  const saveDrawer = (e, _id) => {
    e.preventDefault();
    console.log(_id)
    localStorage.setItem("drawer_id", _id);
  }

  const saveDrawerName = (e, _name) => {
    e.preventDefault();
    console.log(_name)
    localStorage.setItem("drawerName", _name);
  }

  const confE = (e) => {
    e.preventDefault();
    const enteredName = prompt('Please enter your Email');
    confirmEmail(enteredName);
  }



  function AlertDismissible() {
    const [show, setShow] = useState(true);
  
    return (
      <>
        <Alert style={{width:"100%", height:"40%"}} show={show} variant="success">
          <Alert.Heading>Please Confirm your Email
          <Button style={{marginLeft:"10px"}} onClick={(e) => confE(e)} variant="outline-success">
            click here to Confirm
            </Button>
          <Button className ="btn float-right" onClick={() => setShow(false)} variant="outline-success">
          <MdClose />
            </Button>

          </Alert.Heading>
        </Alert>
  
       {/*  {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>} */}
      </>
    );
  }
  


  return (
    
    <div style={{ marginTop: "20px" }}>
      <AlertDismissible />
      <Row style={{ margin: "30px" }}>
        <Col>
          <span><input type="text" placeholder="Search..." onChange={event => { setSearchTerm(event.target.value) }} style={{ /* marginTop: "15px", */ marginLeft: "30px", marginRight: "10px", width: "300px", height: "30px", paddingLeft: "10px", fontSize: "15px", borderRadius: '15px' }} /></span>
          {/* </Col>
        <Col style={{ marginLeft: "-500px" }}> */}
          <span><button type="button" class="btn btn-secondary" onClick={handleShow} style={{ borderRadius: '15px' }}><MdAdd /></button>
            {/*  <span><button type="button" className="btn btn-secondary" onClick={goToUserManagement}style={{backgroundColor: "purple", borderRadius: '15px'}}><MdSupervisorAccount/></button></span>*/}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add a new Drawer</Modal.Title>
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
                <Button variant="secondary" onClick={handleClose} style={{ borderRadius: '15px' }}>
                  <MdClose />
                </Button>
                <Button variant="primary"
                  onClick={(e) => { handleSubmit(); handleClose() }} style={{ borderRadius: '15px' }}>
                  <MdCheck />
                </Button>
              </Modal.Footer>
            </Modal></span>
        </Col>
      </Row>
      {get.blogs &&
        get.blogs.filter((item) => {
          if (searchTerm == "") {
            return item
          } else if (item.drawertitle.toLowerCase().includes(searchTerm.toLowerCase())) {
            return item
          }
        }
        ).map((item) => (
          <Container key={item.id}>
            <Row className="aaa" style={{ marginTop: "20px" }} >
              <Col xs="1" onClick={(e) => { { goNext(e, item.drawer_id) } }}>
                <div style={{ width: "30px", height: "30px", backgroundColor: "white", borderRadius: "50%" }}></div>
              </Col>

              <Col xs="4" style={{ marginRight: "100px" }} onClick={(e) => { { goNext(e, item.drawer_id) } }}>
                <span>{item.drawertitle}</span>
              </Col>
              <Col xs="2" onClick={(e) => { { goNext(e, item.drawer_id) } }}>
                <span>{dayjs(item.creationdate).format('MMM, D, YYYY')}</span>
              </Col>
              <Col>
                <span>
                  <button type="button" class="btn btn-warning" style={{ marginRight: "10px", borderRadius: '15px' }} onClick={(e) => { saveDrawerName(e, item.drawertitle); saveDrawer(e, item.drawer_id); handleShowUpd() }} ><MdOutlineModeEdit /></button>
                  <Modal show={showUpd} onHide={handleCloseUpd}>
                    <Modal.Header closeButton>
                      <Modal.Title>Update Drawer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group className="mb-3" id="updateName">
                          <Form.Label>New Name</Form.Label>
                          <Form.Control id="drawerNew" type="text" placeholder={localStorage.getItem("drawerName")} name="newName" onChange={handleName} />
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseUpd} style={{ borderRadius: '15px' }}>
                        <MdClose />
                      </Button>
                      <Button variant="primary"
                        onClick={(e) => { handleUpdate(e, localStorage.getItem("drawer_id")); handleCloseUpd() }} style={{ borderRadius: '15px' }}>
                        <MdCheck />
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  {/* <button type="button" class="btn btn-danger" onClick={(e) => deleteDrawer(e, item.drawer_id)}><MdDeleteForever/></button> */}
                  <button type="button" class="btn btn-danger" style={{ marginRight: "10px", borderRadius: '15px' }} onClick={(e) => { saveDrawerName(e, item.drawertitle); saveDrawer(e, item.drawer_id); handleDeleteShow() }}><MdDeleteForever /></button>
                  <Modal show={showDelete} onHide={handleCloseDelete}>
                    <Modal.Header closeButton>
                      <Modal.Title>Delete Drawer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Are you sure you want to permanently delete {localStorage.getItem("drawerName")} ?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseDelete} style={{ borderRadius: '15px' }}>
                        <MdClose />
                      </Button>
                      <Button variant="primary"
                        onClick={(e) => { deleteDrawer(e, localStorage.getItem("drawer_id")); handleCloseDelete() }} style={{ borderRadius: '15px' }}>
                        <MdCheck />
                      </Button>
                    </Modal.Footer>
                  </Modal></span>
              </Col>
            </Row>




          </Container>
        ))}
    </div>
  );
};

export default AxiosPost;
