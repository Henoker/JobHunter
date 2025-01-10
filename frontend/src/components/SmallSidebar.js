import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
// import { useAppContext } from '../context/appContext'
import Logo from "./Logo";
import NavLinks from "./NavLinks";

export const SmallSidebar = () => {
  //   const { showSidebar, toggleSidebar } = useAppContext()
  return (
    <Wrapper>
      <div className="sidebar-container show-sidebar">
        {/* <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
        
      > */}
        <div className="content">
          {/* <button className='close-btn' onClick={toggleSidebar}> */}
          <button className="close-btn">
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          {/* <NavLinks toggleSidebar={toggleSidebar}/> */}
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
