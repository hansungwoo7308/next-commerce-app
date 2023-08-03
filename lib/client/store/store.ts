import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "lib/client/store/authSlice";
import { cartSlice } from "lib/client/store/cartSlice";
import { loadingSlice } from "lib/client/store/loadingSlice";
import { modalSlice } from "lib/client/store/modalSlice";
import { notifySlice } from "lib/client/store/notifySlice";
import { orderSlice } from "lib/client/store/orderSlice";
import { ordersSlice } from "lib/client/store/ordersSlice";
export const store = configureStore({
  reducer: {
    loading: loadingSlice.reducer,
    auth: authSlice.reducer,
    notify: notifySlice.reducer,
    modal: modalSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
    oders: ordersSlice.reducer,
  },
});
