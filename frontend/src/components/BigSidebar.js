// import { useAppContext } from "../context/appContext";
import NavLinks from "./NavLinks";
import Logo from "../components/Logo";
import Wrapper from "../assets/wrappers/BigSidebar";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../features/sidebarSlice";

const BigSidebar = () => {
  // const { showSidebar } = useAppContext();
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      {/* <div className="sidebar-container "> */}
      <div
        className={
          showSidebar ? "sidebar-container " : "sidebar-container show-sidebar"
        }
      >
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
