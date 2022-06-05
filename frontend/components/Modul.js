
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { addDrawer } from '../lib/newDrawer';
import React from "react";



class Modul extends React.Component {

    state = {
        drawerName: ''
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        const { drawerName } = this.state;
        event.preventDefault();
        console.log(drawerName)
        addDrawer(drawerName)

    }
    render() {
        return (
            <Modal  /* show={show} onHide={handleClose} */>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3" id="drawerName">
                            <Form.Label>userID</Form.Label>
                            <Form.Control id="drawerNew" type="text" placeholder="new Drawer Name" name='drawerName' onChange={this.handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose} style={{ borderRadius: '15px' }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleClose} style={{ borderRadius: '15px' }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>


        );
    };
}
export default Modul;
