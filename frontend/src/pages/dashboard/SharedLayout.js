import React from "react";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { NavBar, SmallSidebar, BigSidebar } from "../../components";

const SharedLayout = ({ children, isOpen, toggleSidebar }) => {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <BigSidebar />
        <div>
          <NavBar toggleSidebar={toggleSidebar} />
          <div className="dashboard-page">{children}</div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
