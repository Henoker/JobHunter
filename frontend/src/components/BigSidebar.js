import React from "react";
import NavLinks from "./NavLinks";
import Logo from "../components/Logo";
import Wrapper from "../assets/wrappers/BigSidebar";

// import { toggleSidebar } from "../features/sidebarSlice";

const BigSidebar = () => {
  // const { showSidebar } = useAppContext();

  return (
    <Wrapper>
      {/* <div className="sidebar-container "> */}
      <div className="sidebar-container show-sidebar">
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
