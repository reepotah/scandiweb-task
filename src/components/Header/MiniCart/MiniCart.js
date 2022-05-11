import React, { Component } from "react";
import { connect } from "react-redux";
import "./MiniCart.css";

class MiniCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      test: "",
    };
  }
  calculateTotal() {
    /*todo*/
    return 0;
  }
  renderList(count) {
    if (!count)
      return (
        <div className="miniProductContainer empty">Your bag is empty!</div>
      );
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
    return (
      <>
        <div className="miniCartContainer">
          <div className="cartTitle">
            <b>My Bag,</b> {this.props.cartCounter} items
          </div>
          <div className="miniCartListContainer">
            {this.renderList(this.props.cartCounter)}
          </div>
          <div className="miniCartTotal">
            <b>Total:</b>
            <b style={{ textAlign: "end" }}>
              {this.props.currency.symbol}
              {this.calculateTotal()}
            </b>
          </div>
          <div className="miniCartButtonsContainer">
            <button className="miniCartButton viewBag">VIEW BAG</button>
            <button className="miniCartButton checkOut">CHECK OUT</button>
          </div>
        </div>
        <div className="pageCurtain" onClick={this.props.onClick} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { data } = state;
  const { cart } = state;
  return {
    currency: data.currency,
    cartCounter: cart.cartCounter,
    cartContent: cart.cartContent,
  };
};
/*
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentCategory: (value) => dispatch(setCurrentCategory(value)),
    setCurrency: (value) => dispatch(setCurrency(value)),
  };
};*/
export default connect(mapStateToProps, null)(MiniCart);
