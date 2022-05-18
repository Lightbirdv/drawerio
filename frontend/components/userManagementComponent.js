import React, { useEffect, useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { updateUser } from "../lib/updateUser";
import { deleteUser } from "../lib/deleteUser";
import {useRouter} from 'next/router';
import { makeAdmin } from "../lib/makeAdmin";



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
        /* forceReload() */
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

    return (
        <div style={{ marginTop: "50px" }}>
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
                        posts.blogs.map((item) => (
                            <tr key={item.id}>
                                <td>{item.users_id}</td>
                                <td>{item.email}</td>
                                <td>{item.isadmin.toString()}</td>
                                <td>
                                    <button type="button" class="btn btn-warning" style={{ marginRight: "10px" }} onClick={handleShowUpd}>Edit</button>
                                    <Modal show={showUpd} onHide={handleCloseUpd}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Modal heading</Modal.Title>
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
                                                Close
                                            </Button>
                                            <Button variant="primary"
                                                onClick={(e) => { handleUpdate(e, item.users_id); handleCloseUpd() }} >
                                                Save Changes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <button type="button" class="btn btn-success" style={{ marginRight: "10px" }} onClick={(e) => handleAdmin(e, item.email)}>Set Admin</button>
                                    <button type="button" class="btn btn-danger" onClick={(e) => deleteU(e, item.users_id)}>Delete</button></td>
                            </tr>
                        ))}
                </tbody>
            </ReactBootStrap.Table>
        </div>
    );
};

export default UserManagement;
