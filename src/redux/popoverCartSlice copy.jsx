import { createSlice } from "@reduxjs/toolkit";

const popoverCartSlice = createSlice({
  name: "popoverCart",
  initialState: { isCartOpen: false },
  reducers: {
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});
export const { openCart, closeCart, toggleCart } = popoverCartSlice.actions;
export default popoverCartSlice.reducer;
