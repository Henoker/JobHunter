import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getUserInfo } from "../features/auth/authSlice";
import Wrapper from ".././assets/wrappers/SharedLayout";
import NavBar from "../components/NavBar";

const Dashboard = () => {
  // const { userInfo, user } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (user && user.access && !userInfo.first_name) {
  //     dispatch(getUserInfo());
  //   }
  // }, [user, userInfo, dispatch]);

  // if (!userInfo.first_name) {
  //   return <p>Loading...</p>;
  // }

  return (
    <Wrapper>
      <main className="dashboard">
        <h1>Welcome, </h1>
      </main>
    </Wrapper>
  );
};

export default Dashboard;
