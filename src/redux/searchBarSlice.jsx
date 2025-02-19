import { createSlice } from "@reduxjs/toolkit";

const searchBarSlice = createSlice({
  name: "searchBar",
  initialState: { isOpen: false },
  reducers: {
    openSearch: (state) => {
      state.isOpen = true;
    },
    closeSearch: (state) => {
      state.isOpen = false;
    },
    toggleSearch: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});
export const { openSearch, closeSearch, toggleSearch } = searchBarSlice.actions;

export default searchBarSlice.reducer;
