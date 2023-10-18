import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "lib/client/store/authSlice";
import { cartSlice } from "lib/client/store/cartSlice";
import { loadingSlice } from "lib/client/store/loadingSlice";
import { productManagerSlice } from "lib/client/store/productManagerSlice";
import { modalSlice } from "lib/client/store/modalSlice";
import { notifySlice } from "lib/client/store/notifySlice";
import { orderSlice } from "lib/client/store/orderSlice";
import { orderedSlice } from "lib/client/store/orderedSlice";
// import { ordersSlice } from "lib/client/store/ordersSlice";
import { userApiSlice } from "lib/client/store/userApiSlice";

export const store = configureStore({
  reducer: {
    loading: loadingSlice.reducer,
    auth: authSlice.reducer,
    notify: notifySlice.reducer,
    modal: modalSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
    ordered: orderedSlice.reducer,
    productManager: productManagerSlice.reducer,
    // orders: ordersSlice.reducer,
    // [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApiSlice.middleware),
});
