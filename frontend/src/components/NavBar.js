import React from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { useAuth } from "../context/AuthContext";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";

// import { useAppContext } from '../context/appContext';

import Logo from "./Logo";
import { useState } from "react";

const NavBar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [showLogout, setShowLogout] = useState(false);
  // console.log(user);
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
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
            {user ? user.first_name : "Guest"}

            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" className="dropdown-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default NavBar;
