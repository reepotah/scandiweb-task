import React, { Component } from "react";
import { connect } from "react-redux";
import { changeAttributes, decreaseQuantity, increaseQuantity } from "../../../../redux/cartSlice";
import MiniAttributeSelector from "./MiniAttributeSelector/MiniAttributeSelector";
import "./MiniProductEntry.css";

class MiniProductEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: {},
      imageIndex: 0,
    };
    this.onAttributeClick = this.handleAttributeButtonClick.bind(this);
  }
  handleAttributeButtonClick(attribute, itemId) {
    let item = {
      id: this.props.product.id,
      product: this.props.product,
      selected: this.props.selected,
      quantity: this.props.quantity,
    };

    let newSelected = { ...this.props.selected };
    newSelected[attribute.type + ":" + attribute.id] = itemId;

    this.props.changeAttributes(item, newSelected);
  }
  handleQuantityButtonClick(increment) {
    let item = {
      id: this.props.product.id,
      product: this.props.product,
      selected: this.props.selected,
      quantity: this.props.quantity,
    };

    increment ? this.props.increaseQuantity(item) : this.props.decreaseQuantity(item);
  }
  render() {
    let product = this.props.product;
    let price = "";
    product.prices.forEach((element) => {
      if (element.currency.label === this.props.currency.label) {
        price = element.currency.symbol + element.amount;
      }
    });
    return (
      <div className="miniProductEntryContainer">
        <div className="miniProductDetailsContainer">
          <div className="miniProductDetailsTitle">
            <b>{product.brand}</b>
            <br /> {product.name}
          </div>
          <div className="miniProductDetailsPrice">{price}</div>
          <div className="miniProductDetailsAttributeContainer">
            <MiniAttributeSelector
              attributes={product.attributes}
              selected={this.props.selected}
              onClick={this.onAttributeClick}
            />
          </div>
        </div>
        <div className="miniProductSecondaryContainer">
          <div className="miniProductQuantitySelector">
            <button
              className="miniProductQuantityButton"
              onClick={() => {
                this.handleQuantityButtonClick(true);
              }}
            >
              +
            </button>
            <div className="miniProductQuantityValue">{this.props.quantity}</div>
            <button
              className="miniProductQuantityButton"
              onClick={() => {
                this.handleQuantityButtonClick(false);
              }}
            >
              -
            </button>
          </div>
          <div className="miniProductImageSlider">
            <img className="miniProductImage" src={product.gallery[0]} alt={product.id} />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { data } = state;
  return {
    currency: data.currency,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    increaseQuantity: (value) => dispatch(increaseQuantity(value)),
    decreaseQuantity: (value) => dispatch(decreaseQuantity(value)),
    changeAttributes: (...values) => dispatch(changeAttributes(values)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MiniProductEntry);
