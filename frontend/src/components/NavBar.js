import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { useAuth } from "../context/AuthContext";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";

// import { useAppContext } from '../context/appContext';

import Logo from "./Logo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        {/* <button 
            type='button'
            className='toggle-btn' 
            onClick={toggleSidebar}><FaAlignLeft/></button> */}
        <div>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
          <button type="button" className="btn" onClick={logout}>
            <FaUserCircle />
            name
            <FaCaretDown />
          </button>
          <div className={logout ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" className="dropdown-btn">
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default NavBar;
