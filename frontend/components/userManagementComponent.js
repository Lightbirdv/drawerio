import React, { useEffect, useState } from "react";
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



const UserManagement = () => {

    const router = useRouter();
    const forceReload = () => {
        router.reload();
    }

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
        forceReload()
    }

    const deleteU = (e, _id) => {
        e.preventDefault();
        deleteUser(_id)
        forceReload()
    }

    const handleAdmin = (e, _id) => {
        console.log(_id)
        e.preventDefault();
        makeAdmin(_id)
        forceReload()
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
    }, [setPosts]);

    /* Searchinput */
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div style={{ marginTop: "50px" }}>
            {/* Searchfield */}
            <input type="text" placeholder="Search..." onChange={event => { setSearchTerm(event.target.value) }} style={{ margin: "10px", width: "200px", height: "30px", paddingLeft: "10px", fontSize: "15px" }} />
            <ReactBootStrap.Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>email</th>
                        <th>isAdmin</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.blogs &&
                        posts.blogs.filter((item) => {
                            if (searchTerm == "") {
                                return item
                            } else if (item.email.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return item
                            }
                        }
                        ).map((item) => (
                            <tr key={item.users_id}>
                                <td>{item.users_id}</td>
                                <td>{item.email}</td>
                                <td>{item.isadmin.toString()}</td>
                                <td>
                                    <button type="button" class="btn btn-warning" style={{ marginRight: "10px" }} onClick={handleShowUpd}><MdOutlineModeEdit /></button>
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
                                            <Button variant="secondary" onClick={handleCloseUpd}>
                                                <MdClose />
                                            </Button>
                                            <Button variant="primary"
                                                onClick={(e) => { handleUpdate(e, item.users_id); handleCloseUpd() }} >
                                                <MdCheck />
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <button type="button" class="btn btn-success" style={{ marginRight: "10px" }} onClick={(e) => handleAdmin(e, item.email)}><MdAdminPanelSettings /></button>
                                    <button type="button" class="btn btn-danger" style={{ marginRight: "10px" }} onClick={handleDeleteShow}><MdDeleteForever /></button>
                                    <Modal show={showDelete} onHide={handleCloseDelete}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Delete User</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            Are you sure you want to permanently delete {item.email}?
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleCloseDelete}>
                                                <MdClose />
                                            </Button>
                                            <Button variant="primary"
                                                onClick={(e) => { deleteU(e, item.users_id); handleCloseDelete() }}>
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

export default UserManagement;
