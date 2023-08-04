import { createSlice } from "@reduxjs/toolkit";
const initialState: any = [];
export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      // state.orders = action.payload;
      return action.payload;
    },
  },
});
export const { setOrders } = ordersSlice.actions;
