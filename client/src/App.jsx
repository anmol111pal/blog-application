import { Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Home from "./components/Home";
import About from "./components/About";
import Blogs from "./components/Blogs";
import Profile from "./components/Profile";
import WriteBlog from "./components/WriteBlog";
import { useAuth } from "./AuthContext";
import EditProfile from "./components/EditProfile";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register/>} />
      <Route exact path="/logout" element={<Logout />} />

      <Route exact path="/about" element={<About />} />
      <Route exact path="/blogs" element={<Blogs />} />
      <Route exact path="/me" element={<Profile />} />

      <Route exact path="/profile/edit" element={<EditProfile />} />

      <Route exact path="/write" element={<WriteBlog />} />
    </Routes>
  )
}

export default App