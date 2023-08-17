import { createSlice } from "@reduxjs/toolkit";
// type Auth = {
//   status:boolean,
//   user:{
//     username:string,
//     email:string,
//     role:string,
//     image:string
//   }|null,
//   accessToken:string|null
// }
const initialState: any = {
  status: false,
  user: null,
  accessToken: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      if (!accessToken) state.status = false;
      else state.status = true;
      state.user = user;
      state.accessToken = accessToken;
    },
    signout: (state, action) => {
      state.status = false;
      state.user = null;
      state.accessToken = null;
    },
    updateUser: (state, action) => {
      const { user } = action.payload;
      const { username, email, role, image } = user;
      if (username) state.user.username = username;
      if (email) state.user.email = email;
      if (role) state.user.role = role;
      if (image) state.user.image = image;
    },
  },
});
export const { setCredentials, signout, updateUser }: any = authSlice.actions;
