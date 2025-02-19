import { createSlice } from "@reduxjs/toolkit";

const popoverMenuSlice = createSlice({
  name: "popoverMenu",
  initialState: { isOpen: false },
  reducers: {
    openPopover: (state) => {
      state.isOpen = true;
    },
    closePopover: (state) => {
      state.isOpen = false;
    },
    togglePopover: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});
export const { openPopover, closePopover, togglePopover } =
  popoverMenuSlice.actions;
export default popoverMenuSlice.reducer;
