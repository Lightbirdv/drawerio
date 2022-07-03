import React, { useEffect, useState, useReducer } from "react";
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
import { Col, Container, Row } from "react-bootstrap";



const ThirdPageComponent = () => {
  const [state, setState] = useState({
    drawerName: '',
    newName: '',
    dime: '',
    userID: ''
  })

  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);


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
    forceUpdate();
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
  }, [reducerValue]);

  /* Searchinput */
  const [searchTerm, setSearchTerm] = useState('');

  const saveDrawerEntry = (e, _id) => {
    e.preventDefault();
    console.log(_id)
    localStorage.setItem("entry_id", _id);
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <Row style={{ margin: "30px" }}>
        <Col>
          <span><input type="text" placeholder="Search..." onChange={event => { setSearchTerm(event.target.value) }} style={{ /* marginTop: "15px", */ marginLeft: "142px", width: "300px", height: "30px", paddingLeft: "10px", fontSize: "15px", borderRadius: '15px' }} /></span>
        </Col>
      </Row>

      {posts.blogs &&
        posts.blogs.filter((item) => {
          const keys = ["comment", "originurl", "seltext"]
          if (searchTerm == "") {
            return item
          } else if (keys.some((key) => item[key].toLowerCase().includes(searchTerm.toLowerCase())) || dayjs(item.creationdate).format('MMM, D, YYYY').toLowerCase().includes(searchTerm.toLowerCase())) {
            console.log(item.videourl[0]);
            return item
          }
        }
        ).map((item) => (
          <Container style={{ width: "70%", textAlign: "left", background: "white", borderRadius: '15px' }} >
            <p key={item.id}>
              <Row style={{ margin: "20px", paddingTop: "10px" }} >
                <Col style={{ textAlign: "center" }}>
                  <span style={{ fontSize: "50px" }}>{dayjs(item.creationdate).format('MMM, D, YYYY')}</span>
                </Col>
              </Row>
              <Row style={{ margin: "20px" }}>
                <Col>
                  <span style={{ fontSize: "30px" }}>{item.comment}</span>
                </Col>
              </Row>

              <Row style={{ margin: "20px" }}>
                <Col>
                  <span>{item.seltext}</span>
                </Col>
              </Row>

              <Row style={{ margin: "20px" }}>
                <Col>
                  <span><a href={item.originurl}>{item.originurl}</a></span>
                </Col>
              </Row>

              <Row >
                <Col>
                  <p><div className="grid grid-cols-4 gap-2" >
                    {item.imageurl &&
                      item.imageurl.map((x) => (

                        <div className="relative" >
                          <div className="absolute inset-0 z-10 flex transition duration-300 ease-in hover:opacity-0" onClick={(e) => showPicture(e, x)}>
                            <div className="absolute inset-0 bg-black opacity-30"> </div>
                            {/* <div className="mx-auto text-white z-10 self-center uppercase tracking-widest text-sm">Hello World</div> */}

                          </div>
                          {/* <div style={{margin:"auto"}}> */}

                          <img src={x} style={{ float: "left", width: "300px", height: "200px", objectFit: "cover" }} />
                          
                          {/* </div> */}
                        </div>
                      ))}
                  </div></p>
                  </Col>
                  </Row>


                  <Row>
                  <Col>
                  <p><div className="grid grid-cols-3 gap-2" >
                    {item.videourl &&
                      item.videourl.map((y) => (
                        <div className="relative" >
                          {/* <div className="absolute inset-0 z-10 flex transition duration-300 ease-in hover:opacity-0">
                            <div className="absolute inset-0 bg-black opacity-30"> </div> */}

                  <iframe style={{ float: "left", width: "300px", height: "200px", objectFit: "cover" }}
                  /* width="300"
                  height="200" */
                  /* src={`https://www.youtube.com/embed/${(y).split("v=")[1]}`} */
                  src={y}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                  </div>
                 /*  </div> */   
                         
                      ))}
                  </div></p>
                  </Col>
                  </Row>
              

              <Row style={{ margin: "10px", padding: "10px", textAlign: "right" }}>
                <Col>
                  <button type="button" class="btn btn-danger" style={{ borderRadius: '15px' }} onClick={(e) => { saveDrawerEntry(e, item.drawerentry_id); handleDeleteShow() }}><MdDeleteForever /></button>
                  <Modal show={showDelete} onHide={handleCloseDelete}>
                    <Modal.Header closeButton>
                      <Modal.Title>Delete Entry</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Are you sure you want to permanently delete ?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseDelete} style={{ borderRadius: '15px' }}>
                        <MdClose />
                      </Button>
                      <Button variant="primary"
                        onClick={(e) => { deleteDrawer(e, localStorage.getItem("entry_id")); handleCloseDelete() }} style={{ borderRadius: '15px' }}>
                        <MdCheck />
                      </Button>
                    </Modal.Footer>
                  </Modal>

                </Col>
              </Row></p>
          </Container>
        ))}
      {/*  </tbody> */}
      {/* </ReactBootStrap.Table> */}
    </div>
  );
};

export default ThirdPageComponent;
