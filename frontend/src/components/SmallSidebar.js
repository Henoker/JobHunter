import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import React from "react";

export const SmallSidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <Wrapper>
      <div className={`sidebar-container ${isOpen ? "show-sidebar" : ""}`}>
        <div className="content">
          <button className="close-btn" onClick={{ toggleSidebar }}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
