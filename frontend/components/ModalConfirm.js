import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import React, { useEffect, useState, useReducer } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (message) => toast(message);

function ModalConfirm() {

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleDeleteShow = () => setShowDelete(true);

    if (typeof window !== "undefined") {
        window.onload = () => {
            if (localStorage.getItem("confirm") !== "confirm")
                handleDeleteShow();
        };
    }


    return (<div>

        <Modal show={showDelete}>
            <Modal.Header>
                <Modal.Title>Your privacy</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                By clicking “Accept”, you agree drawer.io can store data on your device and disclose information in accordance with our privacy Policy.</Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={(e) => {
                        handleCloseDelete();
                        localStorage.setItem("confirm", "confirm");
                        notify("Thank You for Accepting!");

                    }}
                    style={{ borderRadius: "15px" }}
                >
                    Accept
                </Button>
            </Modal.Footer>
        </Modal>
        <ToastContainer />

    </div>)
}

export default ModalConfirm;