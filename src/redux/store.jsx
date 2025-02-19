import { configureStore, createSlice } from "@reduxjs/toolkit";
import popoverMenuReducer from "./popoverMenuSlice";
import searchBarReducer from "./searchBarSlice";
import subcategoriesReducer from "./subcategoriesSlice";
import searchReducer from "./searchSlice";
import popoverCartReducer from "./popoverCartSlice";
import cartItemsReducer from "./cartItemsSlice";
import wishlistSliceReducer from "./wishlistSlice";
import userSliceReducer from "./userSlice";
import orderSliceReducer from "./orderSlice";
import alertSliceReducer from "./alertSlice";

export const store = configureStore({
  reducer: {
    popoverMenu: popoverMenuReducer,
    searchBar: searchBarReducer,
    subcategories: subcategoriesReducer,
    search: searchReducer,
    popoverCart: popoverCartReducer,
    cartItems: cartItemsReducer,
    wishslist: wishlistSliceReducer,
    user: userSliceReducer,
    order: orderSliceReducer,
    alert: alertSliceReducer,
  },
});
