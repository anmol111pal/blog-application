import React from 'react';
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Navbar = (props) => {
  const {isLoggedIn} = useAuth();
  return (
    <nav className="container navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Blog App</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/blogs">Blogs</NavLink>
            </li>

            {isLoggedIn ? <li className="nav-item">
              <NavLink className="nav-link" to="/write">Write a Blog</NavLink>
            </li> : null}


            {isLoggedIn ? <li className="nav-item">
              <NavLink className="nav-link" to="/me">Profile</NavLink>
            </li> : null}
            <li className="nav-item">
              {isLoggedIn ? <NavLink className="nav-link" to="/logout">Logout</NavLink> : 
              <NavLink className="nav-link" to="/login">Login</NavLink> }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;