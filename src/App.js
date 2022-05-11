import { client } from "@tilework/opus";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import { GET_CATEGORIES, GET_CURRENCIES } from "./api/queries";
import Header from "./components/Header/Header";
import {
  setCategories,
  setCurrencies,
  setCurrency,
  setCurrentCategory,
} from "./redux/dataSlice";

class App extends Component {
  componentDidMount() {
    client.post(GET_CATEGORIES).then(({ categories }) => {
      this.props.categories(categories);
      this.props.category(categories[0].name);
    });
    client.post(GET_CURRENCIES).then(({ currencies }) => {
      this.props.currencies(currencies);
      this.props.currency(currencies[0]);
    });
  }
  render() {
    return (
      <div className="appContainer">
        <Header />
        <Outlet />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    categories: (value) => dispatch(setCategories(value)),
    currencies: (value) => dispatch(setCurrencies(value)),
    category: (value) => dispatch(setCurrentCategory(value)),
    currency: (value) => dispatch(setCurrency(value)),
  };
};
export default connect(null, mapDispatchToProps)(App);
