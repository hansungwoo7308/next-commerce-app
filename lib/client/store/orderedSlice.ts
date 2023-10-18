import { createSlice } from "@reduxjs/toolkit";

interface Order {
  product: {};
  ordererInfo?: {
    name: string | null;
    email: string | null;
  };
  deliveryInfo?: {
    address: string | null;
    mobile: string | null;
  };
  payInfo?: {
    total: number;
    isPay: boolean;
  };
}

interface InitialState {
  orders: Order[];
}

const initialState: InitialState = {
  orders: [],
};

export const orderedSlice = createSlice({
  name: "ordered",
  initialState,
  reducers: {
    addToOrdered: (state, action) => {
      state.orders.push(action.payload);
    },
  },
});

export const { addToOrdered } = orderedSlice.actions;
