import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    cart: cartReducer,
  },
});
//
