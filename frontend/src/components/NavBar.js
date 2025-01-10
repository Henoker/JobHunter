import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
// import { useAppContext } from '../context/appContext';
import { getUserInfo } from "../features/auth/authSlice";
import Logo from "./Logo";
import { useState } from "react";

const NavBar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { userInfo, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // const { toggleSidebar, logoutUser, user } = useAppContext()
  useEffect(() => {
    if (user && user.access && !userInfo.first_name) {
      dispatch(getUserInfo());
    }
  }, [user, userInfo, dispatch]);

  if (!userInfo.first_name) {
    return <p>Loading...</p>;
  }
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn">
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
