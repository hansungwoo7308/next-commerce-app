import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  productInfo: {
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
    paymentAmount: number;
  };
}

const initialState: InitialState = {
  productInfo: {
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
    paymentAmount: 0,
  },
};

export const orderSheetSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderSheet: (state, action) => {
      const { productInfo, ordererInfo, deliveryInfo, payInfo } = action.payload;
      if (productInfo) state.productInfo = productInfo;
      if (ordererInfo) state.ordererInfo = ordererInfo;
      if (deliveryInfo) state.deliveryInfo = deliveryInfo;
      if (payInfo) state.payInfo = payInfo;
      // return action.payload;
    },
  },
  // reducers: { setOrderSheet: (state, action) => action.payload },
});

export const { setOrderSheet } = orderSheetSlice.actions;
