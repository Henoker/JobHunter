import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { toggleSidebar } from "../features/sidebarSlice";
// import { useAppContext } from '../context/appContext';
import { getUserInfo, logout } from "../features/auth/authSlice";
import Logo from "./Logo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { userInfo, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { toggleSidebar, logoutUser, user } = useAppContext()

  const handleToggleSidebar = () => {
    console.log("Toggling sidebar");
    dispatch(toggleSidebar());
  };
  useEffect(() => {
    if (user && user.access && !userInfo.first_name) {
      dispatch(getUserInfo());
    }
  }, [user, userInfo, dispatch]);

  if (!userInfo.first_name) {
    return <p>Loading...</p>;
  }

  const handleLogout = () => {
    dispatch(logout()) // Clear user state
      .unwrap() // Ensure promise resolution
      .then(() => {
        navigate("/landing"); // Redirect after logout
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
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
            {userInfo.first_name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default NavBar;
