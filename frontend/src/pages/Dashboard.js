import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../features/auth/authSlice";

const Dashboard = () => {
  const { userInfo, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.access && !userInfo.first_name) {
      dispatch(getUserInfo());
    }
  }, [user, userInfo, dispatch]);

  if (!userInfo.first_name) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome, {userInfo.first_name} </h1>
    </div>
  );
};

export default Dashboard;
