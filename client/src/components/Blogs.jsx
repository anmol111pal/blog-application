import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import BlogItem from "./BlogItem";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "../AuthContext";

const Blogs = (props) => {
  const [blogsData, setBlogsData] = useState([]);
  const [authorData, setAuthorData] = useState([]);
  const {isLoggedIn} = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user_id = Cookies.get("user_id");
    // send a GET request to the /api/blogs to fetch all the blogs
    
    fetchBlogs(user_id);
  }, []);
  

  async function fetchBlogs(user_id) {
    const url = "http://localhost:5000/api/blogs";
    const response = await axios(url, {
      headers: {
        'Cookie': `user_id=${user_id}`, // Set the 'user_id' cookie in the headers
      },
      withCredentials: true, // Include this line to send cookies
    });

    if(response) {
      setBlogsData(response.data.blogs);
      setAuthorData(response.data.authors);
      setIsLoading(false);
      // console.log("Blogs: ", response.data.blogs);
      // console.log("Authors: ", response.data.authors);
    }
  }

  return (
    <>
        <Navbar />
        {isLoggedIn ? 
          <div className="container mt-5">
            <h3 className="text-center">Blogs</h3>

          {isLoading ? 
          <h3 className="text-center my-5"> Fetching blogs ... </h3> 
          : blogsData.map((blog, i) => (
              <BlogItem key={i} blog={blog} author={authorData[i]} />
            ))}
          </div> 
        : 
        <h4 className="text-center mt-5"> You will have to Login first </h4>}
        
    </>
  )
}

export default Blogs;
