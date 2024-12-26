import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import axios from "axios";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
} from "./actions";

// const token = localStorage.getItem('token')
// const user = localStorage.getItem('user')
// const userLocation = localStorage.getItem('location')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: null,
  token: null,
};
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  // const removeUserFromLocalStorage = () => {
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("location");
  // };
  const getCSRFToken = () => {
    const csrfToken = document.cookie.split("csrftoken=")[1];
    return csrfToken;
  };
  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });

    console.log("Sending request with payload:", currentUser);
    try {
      const csrfToken = getCSRFToken();

      const { data } = await axios.post(
        `http://localhost:8000/api/auth/accounts/${endPoint}/`,
        {
          username: currentUser.username,
          email: currentUser.email,
          password: currentUser.password,
        },
        {
          headers: {
            "X-CSRFToken": csrfToken,
            "Content-Type": "application/json",
          },
        }
      );

      const { email, username, tokens } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user: { email, username }, token: tokens.access, alertText },
      });

      // Store user and token in localStorage
      addUserToLocalStorage({
        user: { email, username },
        token: tokens.access,
      });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response?.data?.msg || "Something went wrong" },
      });
    }
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        setupUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
