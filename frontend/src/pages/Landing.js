// import { Logo } from "../components";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";

const Landing = () => {
  return (
    <Wrapper>
      <nav>{/* <Logo /> */}</nav>
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
          <button className="btn btn-hero">Login/Register</button>
        </div>
        {/* Second Page */}
        <img src={main} alt="Job Hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
