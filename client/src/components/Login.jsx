import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { useAuth } from "../AuthContext";
import Cookies from "js-cookie";

const Login = (props) => {
  const [userData, setUserData] = useState({
    username: "", 
    password: ""
  });

  const {setIsLoggedIn, setUser} = useAuth();
  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate("/register");
  }

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // send a POST request to the backend
    try {
      const url = "https://blog-application-backend-mkyvgzeib-anmol111pal.vercel.app/api/users/login";
      const response = await axios.post(url, userData);
      if(response) {
        setIsLoggedIn(true);
        setUser(response.data.userMatch);
        Cookies.set("user_id", response.data.userMatch._id);
      }
      // console.log("response data: ", response.data.userMatch);

      navigate("/blogs");

    } catch(err) {
      console.log(err);
    }    
  }


  return (
    <>
      <Navbar />
      <form className="container mt-5">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input name="username" type="name" className="form-control" id="username" aria-describedby="usernameHelp" required onChange={handleChange} placeholder="Username" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input name="password" type="password" className="form-control" id="password" required onChange={handleChange} placeholder="Password" />
        </div>
        <div className="d-flex justify-content-around">
          <button type="submit" className="btn btn-outline-success" onClick={handleSubmit}>Login</button>
          <button className="btn btn-outline-primary" onClick={navigateToRegister}>Create an account </button>
        </div>
      </form>
    </>

  )
}

export default Login;