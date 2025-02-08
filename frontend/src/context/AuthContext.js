import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      axios
        .get("http://localhost:8000/api/v1/accountsusers/")
        .then((res) => {
          console.log("User Data:", res.data);
          setUser(res.data);
        })
        .catch((err) => {
          console.error(
            "Error fetching user:",
            err.response?.data || err.message
          );
          logout(); // Log out if token is invalid
        });

      axios
        .get("http://localhost:8000/api/v1/jobs/")
        .then((res) => {
          setJobs(res.data); // Store the jobs for the user
          console.log("All Jobs:", res.data);
        })
        .catch((err) => {
          console.error(
            "Failed to fetch jobs:",
            err.response?.data || err.message
          );
        });
    }
  }, [token]);

  const updateJobsList = (updatedJob) => {
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

      axios
        .get("http://localhost:8000/api/v1/jobs/")
        .then((res) => setJobs(res.data))

        .catch((err) => console.error("Error fetching jobs:", err));
    } catch (err) {
      console.error("Login failed", err.response?.data || err.message);
      throw new Error(err.response?.data?.detail || "Login failed.");
    }
  };

  const register = async (formData) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/accountsregister/",
        formData
      );

      console.log("Registration successful:", res.data);
      return {
        success: true,
        message: "Registration successful! Check your email for activation.",
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
      const res = await axios.post(
        "http://localhost:8000/api/v1/password_reset/",
        { email }
      );
      return { success: true, message: "Check your email for reset link." };
    } catch (error) {
      return { success: false, message: "Password reset request failed." };
    }
  };

  const passwordResetConfirm = async (token, password) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/password_reset/confirm/",
        { token, password }
      );
      return {
        success: true,
        message: "Password reset successful. You can now log in.",
      };
    } catch (error) {
      return { success: false, message: "Password reset confirmation failed." };
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/logout/",
        {},
        {
          headers: { Authorization: `Token ${token}` },
        }
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
        "http://localhost:8000/api/v1/accounts/users/update_profile/",
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
        setUser((prevUser) => ({
          ...prevUser,
          ...response.data,
        }));
      } else {
        throw new Error("Failed to update profile.");
      }
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        jobs,
        logout,
        register,
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
