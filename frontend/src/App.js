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
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { login } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Access the user state

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(login.fulfilled(storedUser)); // Directly fulfill the user state
    }
  }, [dispatch]);
  console.log("Auth state:", { user });
  return (
    <BrowserRouter>
      <Routes>
        {user && (
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Stats />} />
            <Route path="all-jobs" element={<AllJobs />} />
            <Route path="add-job" element={<AddJob />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        )}

        {/* Public routes */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activate/:uid/:token" element={<Activation />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/password/reset/confirm/:uid/:token"
          element={<ResetPasswordConfirm />}
        />

        {/* Catch-all for undefined routes */}
        {/* <Route path="*" element={<Error />} /> */}
        <Route
          path="*"
          element={<Navigate to={user ? "/" : "/landing"} replace={true} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import {
//   Error,
//   Landing,
//   Register,
//   Login,
//   Activation,
//   Dashboard,
//   ResetPassword,
//   ResetPasswordConfirm,
//   ProtectedRoute,
// } from "./pages";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import {
//   AddJob,
//   AllJobs,
//   Profile,
//   SharedLayout,
//   Stats,
// } from "./pages/dashboard/";
// function App() {
//   const { user } = useSelector((state) => state.auth);
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <SharedLayout key={user ? user.id : "guest"} />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<Stats />} />
//           <Route path="all-jobs" element={<AllJobs />} />
//           <Route path="add-job" element={<AddJob />} />
//           <Route path="profile" element={<Profile />} />
//         </Route>
//         <Route path="/landing" element={<Landing />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         {/* <Route path="/dashboard" element={<Dashboard />} /> */}
//         <Route path="/activate/:uid/:token" element={<Activation />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//         <Route
//           path="/password/reset/confirm/:uid/:token"
//           element={<ResetPasswordConfirm />}
//         />
//         <Route path="*" element={<Error />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
