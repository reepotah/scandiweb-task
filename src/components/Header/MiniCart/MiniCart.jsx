import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  changeAttributes,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
} from "../../../redux/cartSlice";
import "./MiniCart.css";
import MiniProductEntry from "./MiniProductEntry/MiniProductEntry";

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
  renderList(count) {
    if (!count) return <div className="miniProductContainer empty">Your bag is empty!</div>;
    else
      return (
        <>
          <div className="miniProductContainer">
            <div className="productAttributesContainer">StuffContainer</div>
            <div className="quantitySelector">QuantityContainer</div>
            <div className="productImageContainer">ImageContainer</div>
          </div>
          <div className="miniProductContainer">2</div>

          <div className="miniProductContainer">3</div>
          <div className="miniProductContainer">4</div>
        </>
      );
  }
  render() {
    let cart = this.props.cartContent;
    let count = this.props.cartCounter;
    return (
      <>
        <div className="miniCartContainer">
          <div className="cartTitle">
            <b>My Bag,</b> {this.props.cartCounter} items
          </div>
          <div className="miniCartListContainer">
            {cart.map((element, index) => {
              if (!count)
                return <div className="miniProductContainer empty">Your bag is empty!</div>;
              else
                return (
                  <MiniProductEntry
                    key={index}
                    id={element.id}
                    product={element.product}
                    selected={element.selected}
                    quantity={element.quantity}
                    currency={this.props.currency}
                  />
                );
            })}
          </div>
          <div className="miniCartTotal">
            <b>Total:</b>
            <b style={{ textAlign: "end" }}>
              {this.props.currency.symbol}
              {this.calculateTotal()}
            </b>
          </div>
          <div className="miniCartButtonsContainer">
            <Link className="miniCartButton viewBag" to="/cart" onClick={this.props.onClick}>
              VIEW BAG{" "}
            </Link>
            <button className="miniCartButton checkOut" onClick={this.props.clearCart}>
              CHECK OUT
            </button>
          </div>
        </div>
        <div className="pageCurtain" onClick={this.props.onClick} />
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
