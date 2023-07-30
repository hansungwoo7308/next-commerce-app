import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  status: false,
  user: null,
  // mode: null,
  // username: null,
  // role: null,
  // image: null,
  accessToken: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      // const { mode, username, role, accessToken, image } = action.payload;
      const { user, accessToken } = action.payload;
      state.status = true;
      state.user = user;
      // state.mode = mode;
      // state.username = username;
      // state.role = role;
      // state.image = image;
      state.accessToken = accessToken;
    },
    logOut: (state, action) => {
      state.status = false;
      state.user = null;
      // state.mode = null;
      // state.username = null;
      // state.role = null;
      // state.image = null;
      state.accessToken = null;
    },
    // setAuthImage: (state, action) => {
    //   const { image } = action.payload;
    //   state.image = image;
    // },
  },
});
export const { setCredentials, logOut, setAuthImage }: any = authSlice.actions;
