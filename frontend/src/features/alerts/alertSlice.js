import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAlert: false,
  alertText: "",
  alertType: "",
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    displayAlert: (state) => {
      state.showAlert = true;
      state.alertText = "This is an alert!";
      state.alertType = "success"; // You can customize this
    },
    clearAlert: (state) => {
      state.showAlert = false;
      state.alertText = "";
      state.alertType = "";
    },
  },
});

export const { displayAlert, clearAlert } = alertsSlice.actions;
export default alertsSlice.reducer;
