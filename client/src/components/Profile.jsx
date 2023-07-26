import React from "react";
import Navbar from "./Navbar";
import { useAuth } from "../AuthContext";

const Profile = (props) => {
  const { user } = useAuth();
  const joiningDate = user.createdAt.substring(0, 10);

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
            {/* <a href="/" className="btn btn-primary">Read more</a> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile;