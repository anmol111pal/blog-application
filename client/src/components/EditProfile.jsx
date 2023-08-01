import React, { useState} from "react";
import CryptoJS from "crypto-js";
import Navbar from "./Navbar";
import { useAuth } from "../AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const EditProfile = () => {
    const [userData, setUserData] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    });
    const {setUser} = useAuth();

    const user_id = Cookies.get("user_id");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const url = "http://localhost:5000/api/users/update";
            let updatedUser = {};
            if(userData.name !== "") updatedUser.name = userData.name;
            if(userData.username !== "") updatedUser.username = userData.username;
            if(userData.email !== "") updatedUser.email = userData.email;
            if(userData.password !== "") updatedUser.password = CryptoJS.SHA256(userData.password).toString();
            console.log("new user: ", updatedUser);
            const response = await axios.post(url, updatedUser, {
                headers: {
                  "Cookie": `user_id=${user_id}`, // Set the 'user_id' cookie in the headers
                },
                withCredentials: true, // Include this to send cookies
              });

            if (response) {
                console.log(response.data);
                setUser(response.data.user); // set the user's details in the context
                navigate("/me");
            }
        } catch(err) {
            console.log("Some error occured: ", err);
        }
    }

    return (
        <>
            <Navbar />
            <form className="container mt-5">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input name="name" type="name" className="form-control" id="name" aria-describedby="nameHelp" required onChange={handleChange} value={userData.name} />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input name="username" type="name" className="form-control" id="username" aria-describedby="usernameHelp" required onChange={handleChange} value={userData.username} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required onChange={handleChange} value={userData.email} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input name="password" type="password" className="form-control" id="password" onChange={handleChange} value={userData.password} placeholder="Enter new password" />
                </div>
                <button type="submit" className="btn btn-outline-success" onClick={handleSubmit}>Update Profile</button>
            </form>
        </>
    )
}

export default EditProfile