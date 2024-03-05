import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { cartReducer } from "./slices/cart.slice";

export default configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});
