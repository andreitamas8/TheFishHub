import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAlertOpen: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    openAlert: (state) => {
      state.isAlertOpen = true;
    },
    closeAlert: (state) => {
      state.isAlertOpen = false;
    },
    toggleAlert: (state) => {
      state.isAlertOpen = !state.isAlertOpen;
    },
  },
});

export const { openAlert, closeAlert, toggleAlert } = alertSlice.actions;

export default alertSlice.reducer;
