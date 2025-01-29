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

    //           <Route path="/" element={<SharedLayout />}>
    //             <Route index element={<Stats />} />
    //             <Route path="all-jobs" element={<AllJobs />} />
    //             <Route path="add-job" element={<AddJob />} />
    //             <Route path="profile" element={<Profile />} />
    //           </Route>
    //         )}

    //         {/* Public routes */}
    //         <Route path="/landing" element={<Landing />} />
    //         <Route path="/register" element={<Register />} />
    //         <Route path="/login" element={<Login />} />
    //         <Route path="/activate/:uid/:token" element={<Activation />} />
    //         <Route path="/reset-password" element={<ResetPassword />} />
    //         <Route
    //           path="/password/reset/confirm/:uid/:token"
    //           element={<ResetPasswordConfirm />}
    //         />

    //         {/* Catch-all for undefined routes */}
    //         {/* <Route path="*" element={<Error />} /> */}
    //         <Route
    //           path="*"
    //           element={<Navigate to={user ? "/" : "/landing"} replace={true} />}
    //         />
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
