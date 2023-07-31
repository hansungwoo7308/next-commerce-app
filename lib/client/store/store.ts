import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "lib/client/store/authSlice";
import { loadingSlice } from "lib/client/store/loadingSlice";
import { modalSlice } from "lib/client/store/modalSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    loading: loadingSlice.reducer,
    modal: modalSlice.reducer,
  },
});
