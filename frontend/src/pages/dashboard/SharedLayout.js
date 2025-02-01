import React from "react";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { NavBar, SmallSidebar, BigSidebar } from "../../components";
import { Outlet } from "react-router-dom";

const SharedLayout = ({ isOpen, toggleSidebar }) => {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <BigSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <div>
          <NavBar toggleSidebar={toggleSidebar} />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
