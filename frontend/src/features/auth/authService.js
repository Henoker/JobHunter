import axios from "axios";

const BACKEND_DOMAIN =
  process.env.REACT_APP_BACKEND_DOMAIN || "http://localhost:8000";

const api = axios.create({
  baseURL: BACKEND_DOMAIN,
  headers: {
    "Content-type": "application/json",
  },
});

const REGISTER_URL = `/api/v1/auth/users/`;
const LOGIN_URL = `/api/v1/auth/jwt/create/`;
const ACTIVATE_URL = `/api/v1/auth/users/activation/`;
const RESET_PASSWORD_URL = `/api/v1/auth/users/reset_password/`;
const RESET_PASSWORD_CONFIRM_URL = `/api/v1/auth/users/reset_password_confirm/`;
const GET_USER_INFO = `/api/v1/auth/users/me/`;
const REFRESH_TOKEN_URL = `/api/v1/auth/jwt/refresh/`;

const register = async (userData) => {
  const response = await api.post(REGISTER_URL, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await api.post(LOGIN_URL, userData);
  if (response.data && response.data.access && response.data.refresh) {
    localStorage.setItem("user", JSON.stringify(response.data));
  } else {
    throw new Error("Invalid login response. Tokens missing.");
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const activate = async (userData) => {
  const response = await api.post(ACTIVATE_URL, userData);
  return response.data;
};

const resetPassword = async (userData) => {
  const response = await api.post(RESET_PASSWORD_URL, userData);
  return response.data;
};

const resetPasswordConfirm = async (userData) => {
  const response = await api.post(RESET_PASSWORD_CONFIRM_URL, userData);
  return response.data;
};

const getUserInfo = async (accessToken) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const response = await api.get(GET_USER_INFO, config);
  return response.data;
};

const refreshToken = async () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (!storedUser || !storedUser.refresh) {
    throw new Error("No refresh token available.");
  }
  const response = await api.post(REFRESH_TOKEN_URL, {
    refresh: storedUser.refresh,
  });
  if (response.data && response.data.access) {
    const updatedUser = { ...storedUser, access: response.data.access };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return updatedUser;
  } else {
    throw new Error("Failed to refresh token.");
  }
};

const authService = {
  register,
  login,
  logout,
  activate,
  resetPassword,
  resetPasswordConfirm,
  getUserInfo,
  refreshToken,
};

export default authService;
