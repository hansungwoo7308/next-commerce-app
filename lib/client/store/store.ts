import { configureStore } from "@reduxjs/toolkit";

// layout
import { backgroundSlice } from "lib/client/store/backgroundSlice";
import { loadingSlice } from "lib/client/store/loadingSlice";
import { sideMenuSlice } from "lib/client/store/sideMenuSlice";
import { modalSlice } from "lib/client/store/modalSlice";

// auth
import { authSlice } from "lib/client/store/authSlice";

// data
import { cartSlice } from "lib/client/store/cartSlice";
import { productManagerSlice } from "lib/client/store/productManagerSlice";
import { orderSheetSlice } from "lib/client/store/orderSheetSlice";

// import { userApiSlice } from "lib/client/store/userApiSlice";

export const store = configureStore({
  reducer: {
    // auth
    auth: authSlice.reducer,

    // layout
    background: backgroundSlice.reducer,
    loading: loadingSlice.reducer,
    sideMenu: sideMenuSlice.reducer,
    modal: modalSlice.reducer,

    // data
    cart: cartSlice.reducer,
    orderSheet: orderSheetSlice.reducer,
    productManager: productManagerSlice.reducer,

    // [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApiSlice.middleware),
});
