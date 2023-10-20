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

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      const orders = action.payload;
      state.orders = orders;
    },
    addOrder: (state, action) => {
      const order = action.payload;
      state.orders.push(order);
    },
  },
});

export const { setOrders, addOrder } = ordersSlice.actions;
