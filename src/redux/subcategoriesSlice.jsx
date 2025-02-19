import { createSlice } from "@reduxjs/toolkit";

const subcategoriesSlice = createSlice({
  name: "subcategories",
  initialState: {},
  reducers: {
    initializeSubcategories: (state, action) => {
      return action.payload;
    },
  },
});

export const { initializeSubcategories } = subcategoriesSlice.actions;

export default subcategoriesSlice.reducer;
