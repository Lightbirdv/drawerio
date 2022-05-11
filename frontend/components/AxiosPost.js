import React, { useEffect, useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';

const AxiosPost = () => {
  const [posts, setPosts] = useState({ blogs: [] });

  useEffect(() => {
    const fetchPostList = async () => {
      const { data } = await axios(
        "http://localhost:5000/drawer/all"
      );
      setPosts({ blogs: data });
      console.log(data);
    };
    fetchPostList();
  }, [setPosts]);

  return (
    <div style={{marginTop: "50px"}}>
      <ReactBootStrap.Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Date</th>
            <th><button type="button" class="btn btn-secondary">New Drawer</button></th>
          </tr>
        </thead>
        <tbody>
          {posts.blogs &&
            posts.blogs.map((item) => (
              <tr key={item.id}>
                <td>{item.drawer_id}</td>
                <td>{item.drawertitle}</td>
                <td>{item.creationdate}</td>
                <td><button type="button" class="btn btn-success"style={{marginRight: "10px"}}>Open</button>
                <button type="button" class="btn btn-warning"style={{marginRight: "10px"}}>Edit</button>
                <button type="button" class="btn btn-danger">Delete</button></td>
              </tr>
            ))}
        </tbody>
      </ReactBootStrap.Table>
    </div>
  );
};

export default AxiosPost;
