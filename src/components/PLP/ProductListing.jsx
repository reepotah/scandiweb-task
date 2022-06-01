import React, { Component } from "react";
import { connect } from "react-redux";
import { client } from "@tilework/opus";
import { GET_CATEGORY_BY_ID, GET_PRODUCT_BY_ID } from "../../api/queries";
import ProductBox from "./ProductBox/ProductBox";
import "./ProductListing.css";
import { Navigate } from "react-router-dom";
import { addToCart } from "../../redux/cartSlice";
import { setCurrentCategory } from "../../redux/dataSlice";

class ProductListing extends Component {
  constructor(props) {
    super(props);

    this.state = { category: null, response: null, error: false };
  }

  handleClick(id) {
    <Navigate to={`/productDetails/${id}`} />;
  }
  handleCartClick(id) {
    client.post(GET_PRODUCT_BY_ID(id)).then((result) => {
      let { product } = result;
      if (!product) return;
      else {
        let preSelect = {};
        product.attributes.map((attribute) => {
          preSelect[attribute.type + ":" + attribute.id] = attribute.items[0].id;
          return true;
        });
        this.props.addToCart({
          id: id,
          product: product,
          selected: preSelect,
          quantity: 1,
        });
      }
    });
  }

  getListing(category) {
    client.post(GET_CATEGORY_BY_ID(category)).then((result) => {
      this.setState({ response: result });
    });
  }

  handleCategoryUrl() {
    if (this.state.error) {
      this.setState({ error: false });
      return;
    }
    let link = window.location.pathname.split("/");
    if (!this.props.categories.length) {
      return;
    }
    if (link.length && link.length === 3 && link[1] === "categories") {
      let found = this.props.categories.some((entry) => {
        return entry.name === link[2] ? true : false;
      });
      if (found) {
        this.props.setCurrentCategory(link[2]);
        return;
      } else {
        this.setState({ error: true });
        return;
      }
    }
  }

  componentDidMount() {
    this.handleCategoryUrl();
    if (this.props.category !== this.state.category) {
      this.getListing(this.props.category);
      this.setState({ category: this.props.category });
    }
  }
  componentDidUpdate() {
    this.handleCategoryUrl();
    if (this.props.category !== this.state.category) {
      this.getListing(this.props.category);
      this.setState({ category: this.props.category });
    }
  }

  renderBox(product) {
    let id = product.id;
    let image = product.gallery[0];
    let price = undefined;
    let inStock = product.inStock;
    product.prices.forEach((element) => {
      if (element.currency.label === this.props.currency.label) {
        price = element.currency.symbol + element.amount;
      }
    });
    let name = product.brand + " " + product.name;
    return (
      <ProductBox
        key={id}
        id={id}
        image={image}
        name={name}
        price={price}
        inStock={inStock}
        onCartClick={() => this.handleCartClick(id)}
      />
    );
  }

  render() {
    if (this.state.error) {
      return <Navigate to="/error" replace={true} />;
    }
    return (
      <>
        <div className="category-name">{this.props.category}</div>
        <div className="product-listing">
          {!this.state.response
            ? ""
            : this.state.response.category.products.map((product) => {
                return this.renderBox(product);
              })}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { data } = state;
  return {
    categories: data.categories,
    category: data.currentCategory,
    currency: data.currency,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentCategory: (value) => dispatch(setCurrentCategory(value)),
    addToCart: (value) => dispatch(addToCart(value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductListing);
