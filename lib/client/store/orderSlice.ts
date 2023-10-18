import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  product: {
    options: [{}];
  };

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
  };
}

const initialState: InitialState = {
  product: {
    options: [{}],
  },
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      return action.payload;
    },
  },
  // reducers: { setOrder: (state, action) => action.payload },
});

export const { setOrder } = orderSlice.actions;
