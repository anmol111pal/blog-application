import React, { useEffect } from "react";
import Navbar from './Navbar';
import { useAuth } from "../AuthContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Logout = (props) => {
  const { setIsLoggedIn, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(false);
    setUser(null);
    Cookies.remove("user_id");
    navigate("/login");
  }, []);

  return (
    <>
      <Navbar />
      <p className="text-center">Logging you out</p>
    </>
  )
}

export default Logout;