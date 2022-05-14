import { createSlice, current, original } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartCounter: 0,
    cartContent: [],
  },
  reducers: {
    addToCart: (state, action) => {
      let item = action.payload;
      let cart = state.cartContent;

      if (cart.length) {
        let found = cart.some((entry, index, array) => {
          if (
            entry.id === item.id &&
            Object.keys(entry.selected).toString() === Object.keys(item.selected).toString() &&
            Object.values(entry.selected).toString() === Object.values(item.selected).toString()
          ) {
            entry.quantity++;
            return true;
          }
        });
        if (!found) {
          state.cartContent.push(action.payload);
        }
      } else {
        state.cartContent.push(action.payload);
      }
      state.cartCounter++;
    },
    increaseQuantity: (state, action) => {
      let item = action.payload;
      let cart = state.cartContent;

      if (cart.length) {
        let found = cart.some((entry, index, array) => {
          if (
            entry.id === item.id &&
            Object.keys(entry.selected).toString() === Object.keys(item.selected).toString() &&
            Object.values(entry.selected).toString() === Object.values(item.selected).toString()
          ) {
            entry.quantity++;
            state.cartCounter++;
            return true;
          }
        });
        if (!found) {
          return;
        }
      } else {
        return;
      }
    },
    decreaseQuantity: (state, action) => {
      let item = action.payload;
      let cart = state.cartContent;

      if (cart.length) {
        let found = cart.some((entry, index, array) => {
          if (
            entry.id === item.id &&
            Object.keys(entry.selected).toString() === Object.keys(item.selected).toString() &&
            Object.values(entry.selected).toString() === Object.values(item.selected).toString()
          ) {
            if (entry.quantity > 1) {
              entry.quantity--;
              state.cartCounter--;
              return true;
            } else {
              cart.splice(index, 1);
              state.cartCounter--;
            }
          }
        });
        if (!found) {
          return;
        }
      } else {
        return;
      }
    },
    changeAttributes: (state, action) => {
      let item = action.payload[0];
      let newSelected = action.payload[1];
      let cart = state.cartContent;
      let dupeQuantity = 0;

      if (cart.length) {
        let foundDupes = cart.some((entry, index, array) => {
          if (
            entry.id === item.id &&
            Object.keys(entry.selected).toString() === Object.keys(newSelected).toString() &&
            Object.values(entry.selected).toString() === Object.values(newSelected).toString()
          ) {
            dupeQuantity = entry.quantity;
            cart.splice(index, 1);
            return true;
          }
        });
        let found = cart.some((entry, index, array) => {
          if (
            entry.id === item.id &&
            Object.keys(entry.selected).toString() === Object.keys(item.selected).toString() &&
            Object.values(entry.selected).toString() === Object.values(item.selected).toString()
          ) {
            entry.selected = newSelected;
            if (foundDupes) entry.quantity += dupeQuantity;
            return true;
          }
        });
        if (!found) {
          return;
        }
      } else {
        return;
      }
    },
    clearCart: (state) => {
      state.cartContent = [];
      state.cartCounter = 0;
    },
  },
});
export const { addToCart, increaseQuantity, decreaseQuantity, changeAttributes, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
