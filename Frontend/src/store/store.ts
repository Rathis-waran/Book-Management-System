import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/userSlice";
import adminReducer from "../store/adminSlice";
import authorReducer from "../store/authorSlice";
import categoryReducer from "../store/categorySlice";
import CartReducer from "../store/cartSlice";
import CouponReducer from "../store/couponSlice";
import { orderApi } from "../store/orderSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    author: authorReducer,
    category: categoryReducer,
    cart: CartReducer,
    coupon: CouponReducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(orderApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
