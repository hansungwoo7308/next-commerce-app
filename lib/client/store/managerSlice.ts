import { createSlice } from "@reduxjs/toolkit";
const initialState: any = {
  checkedItems: [],
};
export const managerSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const _id = action.payload;
      state.checkedItems.push(_id);
    },
    deleteItem: (state, action) => {
      const _id = action.payload;
      const newState = state.checkedItems.filter((checked_id: any) => checked_id !== _id);
      return newState;
    },
    // reloadCart: (state, action) => action.payload,
    // clearCart: (state, action) => [],
    // increaseQuantity: (state, action) => {
    //   const { _id } = action.payload;
    //   state.find((v: any) => v._id === _id).quantity++;
    // },
    // decreaseQuantity: (state, action) => {
    //   const { _id } = action.payload;
    //   state.find((v: any) => v._id === _id).quantity--;
    // },
  },
});
export const {
  addItem,
  deleteItem,
}: // reloadCart,
// clearCart,
// increaseQuantity,
// decreaseQuantity,
// deleteItemFromCart,
any = managerSlice.actions;
