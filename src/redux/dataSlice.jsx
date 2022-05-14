import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    categories: [],
    currencies: [],
    currentCategory: "",
    currency: {},
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCurrencies: (state, action) => {
      state.currencies = action.payload;
    },
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { setCategories, setCurrencies, setCurrentCategory, setCurrency } = dataSlice.actions;

export default dataSlice.reducer;
