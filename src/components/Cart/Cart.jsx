import React, { Component } from "react";
import { connect } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import ProductEntry from "../ProductEntry/ProductEntry";
import "./Cart.css";

class Cart extends Component {
  calcCartTotal() {
    let symbol = this.props.currency.symbol;
    let tax = 0;
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
      tax = (total / 100) * 21;
    }
    return (
      <>
        <div className="cart__tax">Tax 21%: </div>
        <b>{symbol + tax.toFixed(2)}</b>
        <div className="cart__quantity">Quantity: </div>
        <b>{this.props.cartCounter}</b>
        <div className="cart__total">Total: </div>
        <b>{symbol + total.toFixed(2)}</b>
      </>
    );
  }

  render() {
    let cart = this.props.cartContent;
    return (
      <>
        <div className="cart__name">Cart</div>
        <div className="cart__list">
          {cart.map((element, index) => {
            return (
              <ProductEntry
                key={index}
                id={element.id}
                product={element.product}
                selected={element.selected}
                quantity={element.quantity}
                currency={this.props.currency}
                isMinified={false}
              />
            );
          })}
        </div>
        <div className="cart__total-container">
          {this.calcCartTotal()}
          {cart.length ? (
            <button className={"cart__order-button"} onClick={this.props.clearCart}>
              Order
            </button>
          ) : (
            <button className="cart__order-button --inactive">Cart is empty!</button>
          )}
        </div>
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
    clearCart: () => dispatch(clearCart()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
