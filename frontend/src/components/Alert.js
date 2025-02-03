import React from "react";

const Alert = ({ type, text }) => {
  if (!text) return null; // Don't render if no message

  return <div className={`alert alert-${type}`}>{text}</div>;
};

export default Alert;


