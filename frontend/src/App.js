import {
  Error,
  Landing,
  Register,
  Login,
  Activation,
  ResetPassword,
  ResetPasswordConfirm,
} from "./pages";
import { AuthProvider } from "./context/AuthContext";
import {
  AddJob,
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
} from "./pages/dashboard/";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import React, { useState } from "react";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/password-reset/:token"
            element={<ResetPasswordConfirm />}
          />
          <Route path="/activation" element={<Activation />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SharedLayout isOpen={isOpen} toggleSidebar={toggleSidebar} />
              </ProtectedRoute>
            }
          >
            <Route index element={<Stats />} />
            <Route path="all-jobs" element={<AllJobs />} />
            <Route path="add-job" element={<AddJob />} />
            <Route path="profile" element={<Profile />} />
            <Route path="edit-job/:id" element={<AddJob />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

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
// } from "./pages";
// import { AuthProvider } from "./context/AuthContext";
// import AddJob from "./pages/dashboard/AddJob";
// import AllJobs from "./pages/dashboard/AllJobs";
// import Profile from "./pages/dashboard/Profile";
// import SmallSidebar from "./components/SmallSidebar";
// import { NavBar } from "./components";
// import Stats from "./pages/dashboard/Stats";
// import SharedLayout from "./pages/dashboard/SharedLayout";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import ProtectedRoute from "./components/ProtectedRoute";
// import React, { useEffect, useState } from "react";

// const App = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleSidebar = () => setIsOpen(!isOpen);

//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/landing" element={<Landing />} />
//           <Route
//             path="/"
//             element={
//               <ProtectedRoute>
//                 <SharedLayout isOpen={isOpen} toggleSidebar={toggleSidebar}>
//                   <Dashboard />
//                 </SharedLayout>
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/profile"
//             element={
//               <ProtectedRoute>
//                 <SharedLayout isOpen={isOpen} toggleSidebar={toggleSidebar}>
//                   <Profile />
//                 </SharedLayout>
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/all-jobs"
//             element={
//               <ProtectedRoute>
//                 <SharedLayout isOpen={isOpen} toggleSidebar={toggleSidebar}>
//                   <AllJobs />
//                 </SharedLayout>
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/add-job"
//             element={
//               <ProtectedRoute>
//                 <SharedLayout isOpen={isOpen} toggleSidebar={toggleSidebar}>
//                   <AddJob />
//                 </SharedLayout>
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;
