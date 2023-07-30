import React, {useEffect, useState} from "react";
import Navbar from "./Navbar";
import BlogItem from "./BlogItem";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Profile = (props) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const user_id = Cookies.get("user_id");
    
    const fetchData = async () => {
      const url = "http://localhost:5000/api/blogs/my";
      try {
        const response = await axios.get(url, {
          headers: {
            "Cookie": `user_id = ${user_id}`, // Set the 'user_id' cookie in the headers
          },
          withCredentials: true, // Include this line to send cookies
        });

        if(response) {
          console.log("Resp: ", response.data.blogs); // blogs of the current user
          setIsLoading(false);
          setBlogs(response.data.blogs);
        }

      } catch(err) {
        setIsLoading(false);
        console.log("Error while fetching user's blogs", err);
      }
    }

    fetchData();

  }, []);

  const joiningDate = user.createdAt.substring(0, 10);

  const navigateToEditProfile = () => {
    navigate("/profile/edit"); // component to edit the profile
  }

  return (
    <>
      <Navbar />
      <div className="container my-5">
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

      <div className="container my-4">
        <h3 className="text-center"> My Blogs </h3>
        {isLoading ? <h4 className="text-center my-5"> Fetching your blogs ... </h4>: null}

        {
          blogs.map((blog, i) => {
            return (
              <BlogItem 
                key={i} 
                blog={blog}
               />
            )
          })
        }
      </div>

    </>
  )
}

export default Profile;