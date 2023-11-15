import { createSlice } from "@reduxjs/toolkit";

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState: false,
  reducers: { setSideMenu: (state, action) => (state = action.payload) },
});

export const { setSideMenu }: any = sideMenuSlice.actions;
