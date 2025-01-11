import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../features/sidebarSlice";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

export const SmallSidebar = () => {
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);
  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    console.log("Toggling sidebar");
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          {/* <button className="close-btn" onClick={handleToggleSidebar}>
            <FaTimes />
          </button> */}
          <button
            style={{
              background: "red",
              color: "white",
              position: "relative",
              zIndex: 9999,
            }}
            onClick={() => console.log("Button clicked")}
          >
            Click Me
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
