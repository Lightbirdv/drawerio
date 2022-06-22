import React, { useEffect, useState, useReducer } from "react";
import * as ReactBootStrap from "react-bootstrap";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { updateUser } from "../lib/updateUser";
import { deleteUser } from "../lib/deleteUser";
import { useRouter } from 'next/router';
import { makeAdmin } from "../lib/makeAdmin";
import { MdAdminPanelSettings } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { MdCheck } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { Col, Container, Row } from "react-bootstrap";



const UserManagement = () => {

    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

    const [pw, setPw] = useState('');
    const [state, setState] = useState('');

    const [showUpd, setShowUpd] = useState(false);
    const handleCloseUpd = () => setShowUpd(false);
    const handleShowUpd = () => setShowUpd(true);

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleDeleteShow = () => setShowDelete(true);

    const handleChange = event => {
        setPw({ password: event.target.value });
        console.log(event.target.name)
    }

    const handlemail = event => {
        setState({ email: event.target.value });
        console.log(event.target.name)
    }

    const handleUpdate = (e, _id) => {
        const { email } = state;
        const { password } = pw;
        e.preventDefault();
        console.log(email, password, _id)
        updateUser(email, password, _id)
        forceUpdate()
    }

    const deleteU = (e, _id) => {
        e.preventDefault();
        deleteUser(_id)
        forceUpdate()
    }

    const handleAdmin = (e, _id) => {
        console.log(_id)
        e.preventDefault();
        makeAdmin(_id)
        forceUpdate()
    }

    const saveID = (e, _name) => {
        e.preventDefault();
        console.log(_name)
        localStorage.setItem("_id", _name);
      }

    const [posts, setPosts] = useState({ blogs: [] });

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }


        const fetchPostList = async () => {
            const { data } = await axios(
                "http://localhost:5000/user/all", {
                headers: headers
            }
            );
            setPosts({ blogs: data });
            console.log(data);
        };
        fetchPostList();
    }, [reducerValue]);

    /* Searchinput */
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div style={{ marginTop: "20px" }}>
            {/* Searchfield */}
            
            <Row style={{ margin: "30px" }}>
        <Col>
          <span><input type="text" placeholder="Search..." onChange={event => { setSearchTerm(event.target.value) }} style={{ /* marginTop: "15px", */ marginLeft: "45px", width: "300px", height: "30px", paddingLeft: "10px", fontSize: "15px", borderRadius: '15px' }} /></span>
        </Col>
        </Row>
            
               {posts.blogs &&
                posts.blogs.filter((item) => {
                    if (searchTerm == "") {
                        return item
                    } else if (item.email.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return item
                    }
                }
                ).map((item) => (
                    <Container key={item.users_id}>

                        <Row style={{ marginTop: "20px" }}>
                            <Col xs="1">
                                <div style={{ width: "30px", height: "30px", backgroundColor: "white", borderRadius: "50%" }}></div>
                            </Col>

                            <Col>
                                <span>{item.users_id}</span>
                            </Col>
                            <Col xs="4" style={{ marginRight: "100px" }}>
                                <span>{item.email}</span>
                            </Col>
                            <Col>
                                <span>{item.isadmin.toString()}</span>
                            </Col>
                            <Col>
                                <span><button type="button" class="btn btn-warning" style={{ marginRight: "10px", borderRadius: '15px' }} onClick={handleShowUpd}><MdOutlineModeEdit /></button>
                                    <Modal show={showUpd} onHide={handleCloseUpd}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Update User</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form>
                                                <Form.Group className="mb-3" id="updateName">
                                                    <Form.Label>Update your email</Form.Label>
                                                    <Form.Control id="drawerNew" type="text" placeholder="email" name="email" onChange={handlemail} />
                                                </Form.Group>
                                                <Form.Group className="mb-3" id="updateDate">
                                                    <Form.Label>Update your Password</Form.Label>
                                                    <Form.Control id="drawerNew" type="text" placeholder="Password" name="password" onChange={handleChange} />
                                                </Form.Group>
                                            </Form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleCloseUpd} style={{ borderRadius: '15px' }}>
                                                <MdClose />
                                            </Button>
                                            <Button variant="primary"
                                                onClick={(e) => { handleUpdate(e, item.users_id); handleCloseUpd() }} style={{ borderRadius: '15px' }}>
                                                <MdCheck />
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <button type="button" class="btn btn-success" style={{ marginRight: "10px", borderRadius: '15px' }} onClick={(e) => handleAdmin(e, item.email)}><MdAdminPanelSettings /></button>
                                    <button type="button" class="btn btn-danger" style={{ marginRight: "10px", borderRadius: '15px' }} onClick={(e) => { saveID(e, item.users_id); handleDeleteShow() }} ><MdDeleteForever /></button>
                                    <Modal show={showDelete} onHide={handleCloseDelete}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Delete User</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            Are you sure you want to permanently delete {item.email}?
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleCloseDelete} style={{ borderRadius: '15px' }}>
                                                <MdClose />
                                            </Button>
                                            <Button variant="primary"
                                                onClick={(e) => { deleteU(e, localStorage.getItem("_id")); handleCloseDelete() }} style={{ borderRadius: '15px' }}>
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

export default UserManagement;
