import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartCounter: 0,
    cartContent: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartCounter++;
      state.cartContent.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cartCounter--;
      console.log(action);
      console.log(action.payload);
      console.log(action.payload === action.payload);
      console.log(state.cartContent);
      let cart = state.cartContent;
      let i = cart.indexOf(action.payload);
      console.log(i);
      let splice = state.cartContent.splice(i, 1);
      console.log(splice);
    },
  },
});
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
