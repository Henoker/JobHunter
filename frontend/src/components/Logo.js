// import logo from "../assets/images/logo.svg";
// import React from "react";

// const Logo = () => {
//   return <img src={logo} alt="Jobify" className="logo" />;
// };

// export default Logo;
import * as React from "react";
const Logo = (props) => (
  <svg
    width={164}
    height={50}
    viewBox="0 0 200 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={0} y={0} width={40} height={50} fill="url(#gradient)" />
    <text
      x={10}
      y={35}
      fontFamily="Arial, sans-serif"
      fontSize={30}
      fill="white"
      fontWeight="bold"
    >
      {"\n    J\n  "}
    </text>
    <text
      x={50}
      y={35}
      fontFamily="Arial, sans-serif"
      fontSize={30}
      fill="#2CB1BC"
    >
      {"\n    JobHunter\n  "}
    </text>
    <defs>
      <linearGradient
        id="gradient"
        x1={0}
        y1={0}
        x2={0}
        y2={50}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#2CB1BC" stopOpacity={0.8} />
        <stop offset="100%" stopColor="#2CB1BC" stopOpacity={0.5} />
      </linearGradient>
    </defs>
  </svg>
);
export default Logo;
