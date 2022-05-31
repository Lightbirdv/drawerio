import React, { useEffect, useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Router from 'next/router';
import { useRouter } from 'next/router';
import { entryDelete } from "../lib/entryDelete";
import dayjs from 'dayjs';
import { MdDeleteForever } from "react-icons/md";
import { MdCheck } from "react-icons/md";
import { MdClose } from "react-icons/md";
import FullPic from "./fullPic";



const ThirdPage = () => {
  const [state, setState] = useState({
    drawerName: '',
    newName: '',
    dime: '',
    userID: ''
  })

  const router = useRouter();
  const forceReload = () => {
    router.reload();
  }


  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleDeleteShow = () => setShowDelete(true);


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
    console.log(_id);
    entryDelete(_id)
    forceReload();
  }


  const showPicture = (e, src_id) => {
    e.preventDefault();
    console.log(src_id)

    const src = localStorage.setItem("src", src_id);
    /* FullPic() */

    Router.push("/showfullpic")
  }


  const [posts, setPosts] = useState({ blogs: [] });

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }


    const fetchPostList = async () => {
      const { data } = await axios(
        "http://localhost:5000/drawerentry/all/" + localStorage.getItem("drawer_id"), {
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

  const saveDrawerEntry = (e, _id) => {
    e.preventDefault();
    console.log(_id)
    localStorage.setItem("entry_id", _id);
  }

  return (
    <div style={{ marginTop: "50px" }}>
      <input type="text" placeholder="Search..." onChange={event => { setSearchTerm(event.target.value) }} style={{ margin: "10px", width: "200px", height: "30px", paddingLeft: "10px", fontSize: "15px" }} />
      <ReactBootStrap.Table striped>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th style={{ paddingLeft: "50px", paddingRight: "50px" }}>Date</th>
            <th>Comment</th>
            <th>Text</th>
            <th>URL</th>
            <th>Pictures</th>
          </tr>
        </thead>
        <tbody>
          {posts.blogs &&
            posts.blogs.filter((item) => {
              if (searchTerm == "") {
                return item
              } else if (item.comment.toLowerCase().includes(searchTerm.toLowerCase())) {
                return item
              }
            }
            ).map((item) => (
              <tr key={item.id}>
                <td>{dayjs(item.creationdate).format('MMM, D, YYYY')}</td>
                <td>{item.comment}</td>
                <td>{item.seltext}</td>
                <td>{item.originurl}</td>
                <td><div className="grid grid-cols-6 gap-1">
                  {item.imageurl &&
                    item.imageurl.map((x) => (

                      <div className="relative" >
                        <div className="absolute inset-0 z-10 flex transition duration-300 ease-in hover:opacity-0" onClick={(e) => showPicture(e, x)}>
                          <div className="absolute inset-0 bg-black opacity-30"> </div>
                          {/* <div className="mx-auto text-white z-10 self-center uppercase tracking-widest text-sm">Hello World</div> */}

                        </div>
                        <img src={x} style={{ float: "left", width: "300px", height: "200px", objectFit: "cover" }} />
                      </div>
                    ))}
                </div></td>
                <td>
                  <button type="button" class="btn btn-danger" style={{ marginRight: "10px" }} onClick={(e) => { saveDrawerEntry(e, item.drawerentry_id); handleDeleteShow() }}><MdDeleteForever /></button>
                  <Modal show={showDelete} onHide={handleCloseDelete}>
                    <Modal.Header closeButton>
                      <Modal.Title>Delete Entry</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Are you sure you want to permanently delete ?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseDelete}>
                        <MdClose />
                      </Button>
                      <Button variant="primary"
                        onClick={(e) => { deleteDrawer(e, localStorage.getItem("entry_id")); handleCloseDelete() }}>
                        <MdCheck />
                      </Button>
                    </Modal.Footer>
                  </Modal></td>
              </tr>
            ))}
        </tbody>
      </ReactBootStrap.Table>
    </div>
  );
};

export default ThirdPage;
