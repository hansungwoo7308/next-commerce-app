import { createSlice } from "@reduxjs/toolkit";
type Order = {};
const initialState: Order = {};
export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: { setOrder: (state, action) => action.payload },
});
export const { setOrder } = orderSlice.actions;
