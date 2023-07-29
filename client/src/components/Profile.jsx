import React from "react";
import Navbar from "./Navbar";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const joiningDate = user.createdAt.substring(0, 10);

  const navigateToEditProfile = () => {
    navigate("/profile/edit"); // component to edit the profile
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card" style={{ width: "100%", margin: "25px" }}>
          <div className="card-body">
            <h3 className="card-title">{user.name}</h3>
            <p className="card-title">Username: {user.username}</p>
            <p className="card-title">{user.email}</p>
            <p className="card-text">Joined {joiningDate}</p>
            <p className="card-text">Authored  {user.posts.length} blogs till now.</p>
            <button className="btn btn-outline-primary" onClick={navigateToEditProfile}>Edit Profile</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile;