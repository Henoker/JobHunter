import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      axios
        .get("http://localhost:8000/api/v1/accountsusers/")
        .then((res) => setUser(res.data))
        .catch((err) => {
          console.error(
            "Error fetching user:",
            err.response?.data || err.message
          );
          logout(); // Log out if token is invalid
        });
    }
  }, [token]);

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

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
