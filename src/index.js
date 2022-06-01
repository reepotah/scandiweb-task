import React from "react";
import ReactDOM from "react-dom/client";
import { client } from "@tilework/opus";
import { Provider } from "react-redux";
import { store, saveState } from "./redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import ProductListing from "./components/PLP/ProductListing";
import ProductDetails from "./components/PDP/ProductDetails";
import Cart from "./components/Cart/Cart";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Spinner from "./components/Spinner/Spinner";
import "./index.css";

client.setEndpoint("http://localhost:4000/");

const root = ReactDOM.createRoot(document.getElementById("root"));

store.subscribe(() => saveState(store.getState()));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Spinner />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/categories/:categoryId" element={<ProductListing />} />
          <Route path="/productDetails/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
