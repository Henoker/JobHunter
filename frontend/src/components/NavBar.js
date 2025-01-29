import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/Navbar";

import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";

// import { useAppContext } from '../context/appContext';

import Logo from "./Logo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [showLogout, setShowLogout] = useState(false);

  const navigate = useNavigate();
  // const { toggleSidebar, logoutUser, user } = useAppContext()

  const handleToggleSidebar = () => {
    console.log("Toggling sidebar");
  };

  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={handleToggleSidebar}
        >
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
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            name
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
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
