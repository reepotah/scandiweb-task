import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changeAttributes,
  decreaseQuantity,
  increaseQuantity,
} from "../../redux/cartSlice";
import AttributeSelector from "../AttributeSelector/AttributeSelector";
import "./ProductEntry.css";

class ProductEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: {},
      imageIndex: 0,
    };
    this.onAttributeClick = this.handleAttributeButtonClick.bind(this);
  }
  handleImageButtonClick(next) {
    let length = this.props.product.gallery.length;
    let imageIndex = this.state.imageIndex;
    next
      ? length - 1 === imageIndex
        ? (imageIndex = 0)
        : imageIndex++
      : imageIndex === 0
      ? (imageIndex = length - 1)
      : imageIndex--;
    this.setState({ imageIndex: imageIndex });
  }
  handleAttributeButtonClick(attribute, itemId) {
    if (this.props.isMinified) return;
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

    increment
      ? this.props.increaseQuantity(item)
      : this.props.decreaseQuantity(item);
  }
  render() {
    let isMinified = this.props.isMinified;
    let miniTag = isMinified ? "--mini" : "";
    let product = this.props.product;
    let price = "";
    product.prices.forEach((element) => {
      if (element.currency.label === this.props.currency.label) {
        price = element.currency.symbol + element.amount;
      }
    });
    return (
      <div className={"product-entry" + miniTag}>
        <div className={"product-entry__details-container" + miniTag}>
          <div className={"product-entry__details-title" + miniTag}>
            <b>{product.brand}</b>
            <br /> {product.name}
          </div>
          <div className={"product-entry__details-price" + miniTag}>
            {price}
          </div>
          <div className={"product-entry__details-attributes" + miniTag}>
            <AttributeSelector
              attributes={product.attributes}
              selected={this.props.selected}
              onClick={this.onAttributeClick}
              isMinified={isMinified}
            />
          </div>
        </div>
        <div className={"product-entry__secondary-container" + miniTag}>
          <div className={"product-entry__quantity-selector" + miniTag}>
            <button
              className={"product-entry__quantity-button" + miniTag}
              onClick={() => {
                this.handleQuantityButtonClick(true);
              }}
            >
              +
            </button>
            <div className={"product-entry__quantity-value" + miniTag}>
              {this.props.quantity}
            </div>
            <button
              className={"product-entry__quantity-button" + miniTag}
              onClick={() => {
                this.handleQuantityButtonClick(false);
              }}
            >
              -
            </button>
          </div>
          <div className={"product-entry__image-slider" + miniTag}>
            <img
              className={"product-entry__product-image" + miniTag}
              src={product.gallery[this.state.imageIndex]}
              alt={product.id}
            />
            {product.gallery.length > 1 && !isMinified && (
              <div className={"product-entry__image-button-group" + miniTag}>
                <button
                  className={"product-entry__image-button --left" + miniTag}
                  onClick={() => {
                    this.handleImageButtonClick(false);
                  }}
                >
                  &lt;
                </button>
                <button
                  className={"product-entry__image-button --right" + miniTag}
                  onClick={() => {
                    this.handleImageButtonClick(true);
                  }}
                >
                  &gt;
                </button>
              </div>
            )}
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
export default connect(mapStateToProps, mapDispatchToProps)(ProductEntry);
