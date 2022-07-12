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
        <div>
            <div className="flex flex-column m-auto w-4/6">
                <div className="flex flex-row items-center mb-12 mt-12">
                    <input
                        className="mr-2"
                        type="text"
                        placeholder="Search..."
                        onChange={(event) => {
                            setSearchTerm(event.target.value);
                        }}
                        style={{
                            width: "300px",
                            height: "35px",
                            paddingLeft: "10px",
                            fontSize: "15px",
                            borderRadius: "10px",
                        }}
                    />
                    {/* <button type="button" class="bg-main text-white w-12 h-8 text-xl text-center" onClick={handleShow} style={{ borderRadius: "10px" }}>
						+
					</button> */}
                </div>
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

                {posts.blogs &&
                    posts.blogs.filter((item) => {
                        if (searchTerm == "") {
                            return item
                        } else if (item.email.toLowerCase().includes(searchTerm.toLowerCase()) || item.isadmin.toString().includes(searchTerm) || item.users_id.toString().toLowerCase().includes(searchTerm)) {
                            return item
                        }
                    }
                    ).map((item) => (
                        <div className="flex flex-row justify-between my-2 p-2 bg-white hover:bg-gray-200 rounded-xl items-center shadow-sm" key={item.users_id}>

                            <div
                                className="ml-4"
                                style={{ width: "40px", height: "40px", border: "1px solid rgb(0,0,0, .2)", backgroundColor: "white", borderRadius: "50%" }}
                            >  </div>

                            {/* <div
									className="ml-8 w-3/6"	
								>
									<a className="m-auto cursor-pointer hover:no-underline text-xl text-text hover:text-gray-400">{item.users_id}</a>
								</div> */}

                                {/* <div className="flex flex-row"> */}
                                <div style={{ width: "40px", height: "40px"}}><span /* style={{margin:"5px"}} */  /* className="mr-8" */>{item.users_id}</span></div>
                                <div style={{ width: "40px", height: "40px"}}><span /* className="mr-8" */>{"adm: " + item.isadmin.toString()}</span></div>
                                <div style={{ width: "40px", height: "40px"}}><span /* className="mr-8" */>{"enb: " + item.enabled.toString()}</span></div>
                                <div style={{ width: "40px", height: "40px", marginRight:"10px"}}><span /* className="mr-8" */>{item.email}</span></div>

                                <span>
                                    <button
                                        type="button"
                                        className="btn mr-2"
                                        style={{ borderRadius: "10px", backgroundColor: "#3CDDC0", color: "white" }}
                                        onClick={() => {
                                            handleShowUpd();
                                        }}
                                    >
                                        <MdOutlineModeEdit />
                                    </button>
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
                                    <button type="button" className="btn btn-success" style={{ marginRight: "10px", borderRadius: '15px' }} onClick={(e) => handleAdmin(e, item.email)} ><MdAdminPanelSettings /></button>
                                    <button type="button" className="btn btn-danger" style={{ marginRight: "10px", borderRadius: '15px' }} onClick={(e) => { saveID(e, item.users_id); handleDeleteShow() }} ><MdDeleteForever /></button>
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
                            </div>
                        /* </div> */
                    ))}
            </div>
        </div>
    );
};
export default UserManagement;
