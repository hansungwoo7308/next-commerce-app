import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  value: "account-menu" | "product-menu" | "";
}

const initialState: InitialState = {
  value: "",
};

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  // initialState: false,
  // initialState: '',
  initialState,
  // reducers: { setSideMenu: (state, action) => (state = action.payload) },
  reducers: {
    setSideMenu: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSideMenu }: any = sideMenuSlice.actions;
