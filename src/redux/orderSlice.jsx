import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentMethod: null,
  courierOption: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setCourierOption: (state, action) => {
      state.courierOption = action.payload;
    },
    resetOrder: (state) => {
      state.paymentMethod = null;
      state.courierOption = null;
    },
  },
});

export const { setPaymentMethod, setCourierOption, resetOrder } =
  orderSlice.actions;

export const selectPaymentMethod = (state) => state.order.paymentMethod;
export const selectCourierOption = (state) => state.order.courierOption;

export default orderSlice.reducer;
