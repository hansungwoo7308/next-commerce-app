import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "lib/client/store/authSlice";
import { cartSlice } from "lib/client/store/cartSlice";
import { loadingSlice } from "lib/client/store/loadingSlice";
import { managerSlice } from "lib/client/store/managerSlice";
import { modalSlice } from "lib/client/store/modalSlice";
import { notifySlice } from "lib/client/store/notifySlice";
import { orderSlice } from "lib/client/store/orderSlice";
import { ordersSlice } from "lib/client/store/ordersSlice";
import { userApiSlice } from "lib/client/store/userApiSlice";
export const store = configureStore({
  reducer: {
    loading: loadingSlice.reducer,
    auth: authSlice.reducer,
    notify: notifySlice.reducer,
    modal: modalSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
    orders: ordersSlice.reducer,
    manager: managerSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApiSlice.middleware),
});
