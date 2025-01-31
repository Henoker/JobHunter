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
import { AuthProvider } from "./context/AuthContext";
import AddJob from "./pages/dashboard/AddJob";
import AllJobs from "./pages/dashboard/AllJobs";
import Profile from "./pages/dashboard/Profile";
import SmallSidebar from "./components/SmallSidebar";
import { NavBar } from "./components";
import Stats from "./pages/dashboard/Stats";
import SharedLayout from "./pages/dashboard/SharedLayout";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import React, { useEffect, useState } from "react";

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
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SharedLayout isOpen={isOpen} toggleSidebar={toggleSidebar}>
                  <Dashboard />
                </SharedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <SharedLayout isOpen={isOpen} toggleSidebar={toggleSidebar}>
                  <Profile />
                </SharedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-jobs"
            element={
              <ProtectedRoute>
                <SharedLayout isOpen={isOpen} toggleSidebar={toggleSidebar}>
                  <AllJobs />
                </SharedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-job"
            element={
              <ProtectedRoute>
                <SharedLayout isOpen={isOpen} toggleSidebar={toggleSidebar}>
                  <AddJob />
                </SharedLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
