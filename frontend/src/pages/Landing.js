import Logo from "../components/Logo";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";

const Landing = () => {
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
          <Link to="/login" className="btn btn-hero">
            Login
          </Link>{" "}
          <Link to="/register" className="btn btn-hero">
            Register
          </Link>
        </div>
        {/* Second Page */}
        <img src={main} alt="Job Hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
