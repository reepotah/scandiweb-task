import React, { Component } from "react";
import { connect } from "react-redux";
import { client } from "@tilework/opus";
import { GET_CATEGORY_BY_ID, GET_PRODUCT_BY_ID } from "../../api/queries";
import ProductBox from "./ProductBox/ProductBox";
import "./ProductListing.css";
import { Link, Navigate } from "react-router-dom";
import { addToCart } from "../../redux/cartSlice";

class ProductListing extends Component {
  constructor(props) {
    super(props);

    this.state = { category: "", response: this.props.response };
  }
  handleClick(id) {
    <Navigate to={`/productDetails/${id}`} />;
  }
  handleCartClick(id) {
    client.post(GET_PRODUCT_BY_ID(id)).then((result) => {
      let { product } = result;
      if (!product) this.setState({ noProduct: true });
      else {
        let preSelect = {};
        product.attributes.map((attribute) => {
          preSelect[attribute.type + ":" + attribute.id] = attribute.items[0].id;
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
  getListing(category) {
    client.post(GET_CATEGORY_BY_ID(category)).then((result) => {
      this.setState({ response: result });
    });
  }
  componentDidMount() {
    this.setState({ category: "" });
  }
  componentDidUpdate() {
    if (this.props.category !== this.state.category) {
      this.getListing(this.props.category);
      this.setState({ category: this.props.category });
    }
  }
  render() {
    return (
      <>
        <div className="categoryName">{this.props.category}</div>
        <div className="productListing">
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
    category: data.currentCategory,
    currency: data.currency,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (value) => dispatch(addToCart(value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductListing);
