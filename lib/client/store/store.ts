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
import { backgroundSlice } from "lib/client/store/backgroundSlice";
import { childrenSlice } from "lib/client/store/childrenSlice";
import { sideMenuSlice } from "lib/client/store/sideMenu";

export const store = configureStore({
  reducer: {
    // layout
    background: backgroundSlice.reducer,
    loading: loadingSlice.reducer,
    sideMenu: sideMenuSlice.reducer,
    modal: modalSlice.reducer,

    // auth
    auth: authSlice.reducer,

    // data
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
    orders: ordersSlice.reducer,
    productManager: productManagerSlice.reducer,

    // notify: notifySlice.reducer,
    // [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApiSlice.middleware),
});
