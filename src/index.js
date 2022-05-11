import React from "react";
import ReactDOM from "react-dom/client";
import { client } from "@tilework/opus";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import ProductListing from "./components/PLP/ProductListing";
import ProductDetails from "./components/PDP/ProductDetails";
import Cart from "./components/Cart/Cart";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import "./index.css";

//client.setEndpoint("http://reepotah.asuscomm.com:4000/");
client.setEndpoint("http://localhost:4000/");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ProductListing />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
          <Route path="/productDetails/:productId" element={<ProductDetails />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
  //</React.StrictMode>
);
