import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [jobs, setJobs] = useState([]);
  const [jobStats, setJobStats] = useState({
    total_jobs: 0,
    pending_jobs: 0,
    interview_jobs: 0,
    declined_jobs: 0,
  });

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;

      axios
        .get("http://localhost:8000/api/v1/accountsusers/")
        .then((res) => {
          // console.log("User Data:", res.data);
          setUser(res.data);
        })
        .catch((err) => {
          console.error(
            "Error fetching user:",
            err.response?.data || err.message
          );
          logout();
        });
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:8000/api/v1/jobs/")
        .then((res) => {
          // console.log("All Jobs:", res.data);
          setJobs(res.data);
        })
        .catch((err) =>
          console.error(
            "Failed to fetch jobs:",
            err.response?.data || err.message
          )
        );
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:8000/api/v1/jobs/stats/")
        .then((res) => {
          // console.log("Job Stats Response:", res.data);
          setJobStats(res.data);
        })
        .catch((err) =>
          console.error(
            "Failed to fetch job statistics:",
            err.response?.data || err.message
          )
        );
    }
  }, [token, jobStats]);

  const updateJobsList = async (updatedJob) => {
    setJobs((prevJobs) => {
      const jobExists = prevJobs.find((job) => job.id === updatedJob.id);
      if (jobExists) {
        // Update existing job
        return prevJobs.map((job) =>
          job.id === updatedJob.id ? updatedJob : job
        );
      } else {
        // Add new job
        return [...prevJobs, updatedJob];
      }
    });

    // Fetch updated job stats
    try {
      const statsResponse = await axios.get(
        "http://localhost:8000/api/v1/jobs/stats/"
      );
      setJobStats(statsResponse.data);
    } catch (err) {
      console.error(
        "Failed to fetch updated job stats:",
        err.response?.data || err.message
      );
    }
  };

  const login = async (credentials) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/accountslogin/",
        credentials
      );
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Token ${res.data.token}`;
    } catch (err) {
      console.error("Login failed", err.response?.data || err.message);
      throw new Error(err.response?.data?.detail || "Login failed.");
    }
  };

  const register = async (formData) => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/accountsregister/",
        formData
      );
      return {
        success: true,
        message: "Registration successful! Redirecting to login page...",
      };
    } catch (err) {
      console.error("Registration failed", err.response?.data || err.message);
      return {
        success: false,
        message: err.response?.data?.detail || "Registration failed.",
      };
    }
  };

  const passwordReset = async (email) => {
    try {
      await axios.post("http://localhost:8000/api/v1/password_reset/", {
        email,
      });
      return { success: true, message: "Check your email for reset link." };
    } catch {
      return { success: false, message: "Password reset request failed." };
    }
  };

  const passwordResetConfirm = async (token, password) => {
    try {
      await axios.post("http://localhost:8000/api/v1/password_reset/confirm/", {
        token,
        password,
      });
      return {
        success: true,
        message: "Password reset successful. You can now log in.",
      };
    } catch {
      return { success: false, message: "Password reset confirmation failed." };
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/logout/",
        {},
        { headers: { Authorization: `Token ${token}` } }
      );
    } catch (err) {
      console.error("Logout failed", err.response?.data || err.message);
    } finally {
      localStorage.removeItem("token");
      setToken("");
      setUser(null);
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  const updateUser = async (updatedData) => {
    try {
      const response = await axios.patch(
        "http://127.0.0.1:8000/api/v1/accountsusers/update_profile/",
        updatedData,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Updated user response:", response.data);
      if (response.status === 200) {
        setUser((prevUser) => ({ ...prevUser, ...response.data }));
        return {
          success: true,
          message: "Profile updated successfully!",
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: "Failed to update profile. Please try again.",
        };
      }
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "An error occurred while updating the profile.",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        jobs,
        jobStats,
        token,
        logout,
        register,
        setJobs,
        passwordReset,
        passwordResetConfirm,
        updateUser,
        updateJobsList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
