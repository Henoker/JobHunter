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
        .get("http://localhost:8000/api/v1/users/")
        .then((res) => setUser(res.data))
        .catch(() => logout());
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
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const logout = () => {
    axios
      .post(
        "http://localhost:8000/api/v1/logout/",
        {},
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .finally(() => {
        localStorage.removeItem("token");
        setToken("");
        setUser(null);
      });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
