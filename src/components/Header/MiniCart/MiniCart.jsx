import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  changeAttributes,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
} from "../../../redux/cartSlice";
import ProductEntry from "../../ProductEntry/ProductEntry";
import "./MiniCart.css";

class MiniCart extends Component {
  calculateTotal() {
    let total = 0;
    if (this.props.cartCounter) {
      let cart = this.props.cartContent;
      cart.forEach((item) => {
        item.product.prices.forEach((element) => {
          if (element.currency.label === this.props.currency.label) {
            total += element.amount * item.quantity;
          }
        });
      });
    }
    return total.toFixed(2);
  }
  render() {
    let cart = this.props.cartContent;
    let count = this.props.cartCounter;
    return (
      <>
        <div className="mini-cart">
          <div className="mini-cart__title">
            <b>My Bag,</b> {this.props.cartCounter} items
          </div>
          <div className="mini-cart__list">
            {!count ? (
              <div className="mini-cart__empty-placeholder">Your bag is empty!</div>
            ) : (
              cart.map((element, index) => {
                return (
                  <ProductEntry
                    key={index}
                    id={element.id}
                    product={element.product}
                    selected={element.selected}
                    quantity={element.quantity}
                    currency={this.props.currency}
                    isMinified={true}
                  />
                );
              })
            )}
          </div>
          <div className="mini-cart__total">
            <b>Total:</b>
            <b style={{ textAlign: "end" }}>
              {this.props.currency.symbol}
              {this.calculateTotal()}
            </b>
          </div>
          <div className="mini-cart__buttons-container">
            <Link className="mini-cart__button view-bag" to="/cart" onClick={this.props.onClick}>
              VIEW BAG{" "}
            </Link>
            <button className="mini-cart__button check-out" onClick={this.props.clearCart}>
              CHECK OUT
            </button>
          </div>
        </div>
        <div className="mini-cart__page-curtain" onClick={this.props.onClick} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { data, cart } = state;
  return {
    currency: data.currency,
    cartCounter: cart.cartCounter,
    cartContent: cart.cartContent,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    increaseQuantity: (value) => dispatch(increaseQuantity(value)),
    decreaseQuantity: (value) => dispatch(decreaseQuantity(value)),
    changeAttributes: (...values) => dispatch(changeAttributes(values)),
    clearCart: () => dispatch(clearCart()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
