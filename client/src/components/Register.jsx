import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import {useAuth} from "../AuthContext";

const Register = (props) => {
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  });
  
  const {isLoggedIn, setIsLoggedIn, user, setUser} = useAuth();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // send a POST request to the backend
    const URL = "http://localhost:5000/api/users/register";
    try {
      const response = await axios.post(URL, userData);
      if(response) {
        setIsLoggedIn(true);
        setUser(response.data);
      }
      console.log("Response data: ", response.data);

      // redirect to /blogs page (upon successful authentication)


    } catch(err) {
      console.log(err);
    }
  }


  return (

    <>
      <Navbar />
      <form className="container mt-5">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input name="name" type="name" className="form-control" id="name" aria-describedby="nameHelp" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input name="username" type="name" className="form-control" id="username" aria-describedby="usernameHelp" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required onChange={handleChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input name="password" type="password" className="form-control" id="password" required onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-outline-success" onClick={handleSubmit}>Register</button>
      </form>
    </>
  )
}

export default Register;