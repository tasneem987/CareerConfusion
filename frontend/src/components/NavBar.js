import React from "react";
import "../styles/NavBar.css";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header>
      <Link to="/" className="logo">CareerConfusion</Link>

      <ul className="navbar">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/service">Service</Link></li>
        <li><Link to="/contact">Contact</Link></li>

        {!user && (
          <>
            <li><Link to="/login">Sign in</Link></li>
            <li><Link to="/register">Sign up</Link></li>
          </>
        )}

        {user && (
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </header>
  );
};

export default NavBar;