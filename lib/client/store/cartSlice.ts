import { createSlice } from "@reduxjs/toolkit";
const initialState: any = [];
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    reloadCart: (state, action) => action.payload,
    clearCart: (state, action) => [],
    increaseQuantity: (state, action) => {
      const { _id } = action.payload;
      state.find((v: any) => v._id === _id).quantity++;
    },
    decreaseQuantity: (state, action) => {
      const { _id } = action.payload;
      state.find((v: any) => v._id === _id).quantity--;
    },
    deleteItemFromCart: (state, action) => {
      const { _id } = action.payload;
      const newState = state.filter((v: any) => v._id !== _id);
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    },
  },
});
export const {
  addToCart,
  reloadCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItemFromCart,
}: any = cartSlice.actions;
