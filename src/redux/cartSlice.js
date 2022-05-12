import { createSlice } from "@reduxjs/toolkit";

/* Product for cart: 
    {
      [this.state.product.id]: [{ selected: this.state.selected, quantity: 1 }],
    }
*/
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartCounter: 0,
    cartContent: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartCounter++;
      //if(state.cartContent[action.payload])
      state.cartContent.push(action.payload);
      console.log(Object.getOwnPropertyNames(action.payload));
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
