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
      {"J"}
    </text>
    <text
      x={50}
      y={35}
      fontFamily="Arial, sans-serif"
      fontSize={30}
      fill="#ff6347"
      fontWeight="bold"
    >
      {"JobHunter"}
    </text>
    <defs>
      <linearGradient
        id="gradient"
        x1={0}
        y1={0}
        x2={0}
        y2={100}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#ff6347" stopOpacity={0.8} />
        <stop offset="100%" stopColor="#ff6347" stopOpacity={0.5} />
      </linearGradient>
    </defs>
  </svg>
);

export default Logo;
