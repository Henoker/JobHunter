import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import React from "react";

export const SmallSidebar = () => {
  const handleToggleSidebar = () => {
    console.log("Toggling sidebar");
  };

  return (
    <Wrapper>
      <div className="sidebar-container show-sidebar">
        <div className="content">
          <button className="close-btn" onClick={handleToggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={handleToggleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
