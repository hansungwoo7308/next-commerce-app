import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "lib/client/store/authSlice";
import { cartSlice } from "lib/client/store/cartSlice";
import { loadingSlice } from "lib/client/store/loadingSlice";
import { productManagerSlice } from "lib/client/store/productManagerSlice";
import { modalSlice } from "lib/client/store/modalSlice";
import { orderSlice } from "lib/client/store/orderSlice";
import { ordersSlice } from "lib/client/store/ordersSlice";
import { notifySlice } from "lib/client/store/notifySlice";
import { userApiSlice } from "lib/client/store/userApiSlice";

export const store = configureStore({
  reducer: {
    loading: loadingSlice.reducer,
    auth: authSlice.reducer,
    modal: modalSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
    orders: ordersSlice.reducer,
    productManager: productManagerSlice.reducer,
    // notify: notifySlice.reducer,
    // orders: ordersSlice.reducer,
    // [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApiSlice.middleware),
});
