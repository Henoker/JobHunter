import React from "react";
import { useSelector } from "react-redux";

const Alert = () => {
  const { alertType, alertText, showAlert } = useSelector(
    (state) => state.alerts
  );

  // Only render the alert if `showAlert` is true
  if (!showAlert) return null;

  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};

export default Alert;

// import { useAppContext } from "../context/appContext";

// const Alert = () => {
//   const { alertType, alertText } = useAppContext();
//   return <div className={`alert alert-${alertType}`}>{alertText}</div>;
// };

// export default Alert;
