import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      return action.payload;
    },
    addToWishlist: (state, action) => {
      if (!state.find((item) => item.id === action.payload.id)) {
        state.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setWishlist, addToWishlist, removeFromWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
