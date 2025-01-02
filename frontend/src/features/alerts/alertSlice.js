import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAlert: false,
  alertType: "",
  alertText: "",
};

const alertSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    displayAlert: (state, action) => {
      state.showAlert = true;
      state.alertType = action.payload.alertType || "error"; // Default to 'error'
      state.alertText = action.payload.alertText || "Something went wrong!";
    },
    clearAlert: (state) => {
      state.showAlert = false;
      state.alertType = "";
      state.alertText = "";
    },
    toggleAlert: (state) => {
      state.showAlert = !state.showAlert; // Toggles the visibility
    },
  },
});

export const { displayAlert, clearAlert, toggleAlert } = alertSlice.actions;

export default alertSlice.reducer;
