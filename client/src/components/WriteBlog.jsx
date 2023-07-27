import React, {useState} from 'react';
import Navbar from "./Navbar";
import { useAuth } from '../AuthContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const WriteBlog = (props) => {
  const {user} = useAuth();

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    author: user.name // name of the author (logged in user)
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value
    });
  }

  const handlePublish = async (e) => {
    e.preventDefault();
    const user_id = Cookies.get("user_id");
    const url = "http://localhost:5000/api/blogs/write";
    try {
      const response = await axios.post(url, blog, {
        headers: {
          'Cookie': `user_id=${user_id}`, // Set the 'user_id' cookie in the headers
        },
        withCredentials: true, // Include this line to send cookies
      });
      if(response) {
        console.log("Blog published");
        navigate("/blogs");
      }

    } catch(err) {
      console.log("Error: ", err);
    }
  }

  return (
    <>
        <Navbar />
        <form className="container mt-5">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input name="title" type="text" className="form-control" id="title" aria-describedby="usernameHelp" required onChange={handleChange} placeholder="Title of the Blogpost" />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <input name="content" type="textarea" className="form-control" id="content" required onChange={handleChange} placeholder="Blogpost" />
        </div>
          <button type="submit" className="btn btn-outline-success" onClick={handlePublish}>Publish</button>
      </form>
    </>
  )
}

export default WriteBlog;