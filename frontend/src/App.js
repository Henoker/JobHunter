import {
  Error,
  Landing,
  Register,
  Login,
  Activation,
  Dashboard,
  ResetPassword,
  ResetPasswordConfirm,
} from "./pages";

import AddJob from "./pages/dashboard/AddJob";
import AllJobs from "./pages/dashboard/AllJobs";
import Profile from "./pages/dashboard/Profile";
import SharedLayout from "./pages/dashboard/SharedLayout";
import Stats from "./pages/dashboard/Stats";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import React, { useEffect } from "react";

function App() {
  const location = useLocation();
  const noNavbar =
    location.pathname === "/register" ||
    location.pathname === "/" ||
    location.pathname.includes("password");

  return (
    <>
      {noNavbar ? (
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/request/password_reset" element={<ResetPassword />} />
          <Route
            path="/password-reset/:token"
            element={<ResetPasswordConfirm />}
          />
        </Routes>
      ) : (
        <SharedLayout
          content={
            <Routes>
              <Route element={<ProtectedRoute />}>
                {/* <Route path="/" element={<SharedLayout />}> */}
                {/* <Route index element={<Stats />} /> */}
                <Route path="all-jobs" element={<AllJobs />} />
                <Route path="add-job" element={<AddJob />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Routes>
          }
        />
      )}
    </>
  );
}

export default App;
