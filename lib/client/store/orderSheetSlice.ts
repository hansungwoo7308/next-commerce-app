import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  product: {
    options: [];
  };
  ordererInfo: {
    name: string | null;
    email: string | null;
  };
  deliveryInfo: {
    address: string | null;
    mobile: string | null;
  };
  payInfo: {
    total: number;
  };
}

const initialState: InitialState = {
  product: {
    options: [],
  },
  ordererInfo: {
    name: null,
    email: null,
  },
  deliveryInfo: {
    address: null,
    mobile: null,
  },
  payInfo: {
    total: 0,
  },
};

export const orderSheetSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderSheet: (state, action) => {
      const { product, ordererInfo, deliveryInfo, payInfo } = action.payload;
      if (product) state.product = product;
      if (ordererInfo) state.ordererInfo = ordererInfo;
      if (deliveryInfo) state.deliveryInfo = deliveryInfo;
      if (payInfo) state.payInfo = payInfo;
      // return action.payload;
    },
  },
  // reducers: { setOrderSheet: (state, action) => action.payload },
});

export const { setOrderSheet } = orderSheetSlice.actions;
