import Logo from "../components/Logo";
import main from "../assets/images/tree-swing.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            Job<span> Tracking</span> App
          </h1>
          <p>
            This app will help you in tracking the current jobs that you are
            persuing.
          </p>
          <button onClick={() => navigate("/login")} className="btn btn-hero">
            Login
          </button>{" "}
          <button
            onClick={() => navigate("/register")}
            className="btn btn-hero"
          >
            Register
          </button>
        </div>
        {/* Second Page */}
        <img src={main} alt="Job Hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
