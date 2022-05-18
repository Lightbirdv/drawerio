import React, { useEffect, useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Router from 'next/router';
import { addDrawer } from '../lib/newDrawer';
import { updateDrawer } from "../lib/updateDrawer";
import { deleteD } from "../lib/deleteD";



const ThirdPage = () => {
  const [state, setState] = useState({
    drawerName: '',
    newName: '',
    dime: '',
    userID: ''
  })
  


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showUpd, setShowUpd] = useState(false);
  const handleCloseUpd = () => setShowUpd(false);
  const handleShowUpd = () => setShowUpd(true);

  const handleChange = event => {
    setState({ [event.target.name]: event.target.value });
    console.log(event.target.name)
  }

  const handleSubmit = event => {
    const { drawerName } = state;
    console.log(drawerName)
    addDrawer(localStorage.getItem('token'), drawerName)
  }

  const handleUpdate = (e, _id) => {
    
    const { newName, dime, userID } = state;
    e.preventDefault();
    console.log(newName, dime, userID, _id)
    updateDrawer(newName, dime, userID, _id)
  }

  const deleteDrawer = (e, _id) => {
    e.preventDefault();
    deleteD(_id)
  }

  const goNext = (e) => {
    e.preventDefault();
    Router.push("/thirdpage")
  }

  const goToUserManagement  = (e) => {
    e.preventDefault();
    Router.push("/thirdpage")
  }


  const [posts, setPosts] = useState({ blogs: [] });

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +localStorage.getItem('token')
    }
   /*  const fetchPostList = async () => { */
      /* const { data } = await axios(
        "http://localhost:5000/drawerentry/all",{
          headers: headers
        }
      ); */

     /*  const {data} = axios("http://localhost:5000/drawerentry/all",{
        headers: headers
      }
       ).then((response) => {
          console.log(response.data[0].imageurl);
        })
      setPosts({ blogs: data });
      console.log(data);
    };
    fetchPostList();
  }, [setPosts]); */

  const fetchPostList = async () => {
    const { data } = await axios(
      "http://localhost:5000/drawerentry/all/"+localStorage.getItem("drawer_id") ,{  
        headers: headers
      }
    );
    setPosts({ blogs: data.rows });
    console.log(data.rows);
  };
  fetchPostList();
}, [setPosts]);

  return (
    <div style={{ marginTop: "50px" }}>
      <ReactBootStrap.Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>comment</th>
            <th>Date</th>
            <th>URL</th>
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
                    Close
                  </Button>
                  <Button variant="primary"
                    onClick={(e) => { handleSubmit(); handleClose() }} >
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
          </tr>
        </thead>
        <tbody>
          {posts.blogs &&
            posts.blogs.map((item) => (
              <tr key={item.id}>
                <td>{item.drawerentry_id}</td>
                <td>{item.comment}</td>
                <td>{item.creationdate}</td>
                <td>{item.imageurl}</td>
                <td><button type="button" class="btn btn-success" style={{ marginRight: "10px" }} onClick={goNext}>Open</button>
                  <button type="button" class="btn btn-warning" style={{ marginRight: "10px" }} onClick={handleShowUpd}>Edit</button>
                  <Modal show={showUpd} onHide={handleCloseUpd}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group className="mb-3" id="updateName">
                          <Form.Label>New Name</Form.Label>
                          <Form.Control id="drawerNew" type="text" placeholder="Name" name="newName" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" id="updateDate">
                          <Form.Label>New Date</Form.Label>
                          <Form.Control id="drawerNew" type="text" placeholder="Date" name="dime" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" id="updateUser">
                          <Form.Label>New User</Form.Label>
                          <Form.Control id="drawerNew" type="text" placeholder="User" name="userID" onChange={handleChange} />
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseUpd}>
                        Close
                      </Button>
                      <Button variant="primary"
                        onClick={(e) => { handleUpdate(e, item.drawer_id); handleCloseUpd() }} >
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <button type="button" class="btn btn-danger" onClick={(e) => deleteDrawer(e, item.drawer_id)}>Delete</button></td>
              </tr>
            ))}
        </tbody>
      </ReactBootStrap.Table>
    </div>
  );
};

export default ThirdPage;
