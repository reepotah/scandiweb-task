import { client } from "@tilework/opus";
import { Markup } from "interweave";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { GET_PRODUCT_BY_ID } from "../../api/queries";
import { addToCart } from "../../redux/cartSlice";
import AttributeSelector from "../AttributeSelector/AttributeSelector";
import "./ProductDetails.css";

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noProduct: false,
      product: undefined,
      image: "",
      selected: {},
    };
    this.onAttributeClick = this.handleAttributeButtonClick.bind(this);
  }

  hadnleAddToCartButtonClick() {
    this.props.addToCart({
      id: this.state.product.id,
      product: this.state.product,
      selected: this.state.selected,
      quantity: 1,
    });
  }
  handleAttributeButtonClick(attribute, id) {
    let selected = { ...this.state.selected };
    selected[attribute.type + ":" + attribute.id] = id;
    this.setState({ selected: selected });
  }
  handleGalleryButtonClick(image) {
    this.setState({ image: image });
  }

  componentDidMount() {
    let arr = window.location.pathname.split("/");
    if (arr.length === 3 && arr[1] === "productDetails") {
      let id = arr[2];
      client.post(GET_PRODUCT_BY_ID(id)).then((result) => {
        let { product } = result;
        if (!product) this.setState({ noProduct: true });
        else {
          let preSelect = {};
          product.attributes.map((attribute) => {
            preSelect[attribute.type + ":" + attribute.id] = attribute.items[0].id;
            return true;
          });
          this.setState({
            product: product,
            image: product.gallery[0],
            selected: preSelect,
          });
        }
      });
    } else this.setState({ noProduct: true });
  }

  renderGalleryButton(image, id) {
    return (
      <div
        key={id}
        className="product-page__gallery-button"
        onClick={() => {
          this.handleGalleryButtonClick(image);
        }}
      >
        <img className="product-page__gallery-thumbnail" src={image} alt="" />
      </div>
    );
  }

  render() {
    let product = this.state.product;
    if (this.state.noProduct) return <Navigate to="/error" replace={true} />;
    if (!product) return;
    else {
      let price = "";
      product.prices.forEach((element) => {
        if (element.currency.label === this.props.currency.label) {
          price = element.currency.symbol + element.amount;
        }
      });
      return (
        <div className="product-page">
          <div className="product-page__gallery">
            <div className="product-page__gallery-selector">
              {product.gallery.map((img, index) => {
                return this.renderGalleryButton(img, index);
              })}
            </div>

            <div className="product-page__gallery-image-container">
              <img className="product-page__gallery-image" src={this.state.image} alt="" />
            </div>
          </div>
          <div className="product-page__details">
            <div className="product-page__details-title">
              <b>{product.brand}</b>
              <br /> {product.name}
            </div>
            <div className="product-page__details-attributes">
              <AttributeSelector
                attributes={product.attributes}
                selected={this.state.selected}
                onClick={this.onAttributeClick}
                isMinified={false}
              />
            </div>
            <div className="product-page__details-price">Price:</div>
            <div className="product-page__details-price-value">{price}</div>
            {product.inStock ? (
              <button
                className="product-page__add-to-cart-button"
                onClick={() => {
                  this.hadnleAddToCartButtonClick();
                }}
              >
                ADD TO CART
              </button>
            ) : (
              <button className="product-page__add-to-cart-button --inactive">OUT OF STOCK</button>
            )}
            <Markup className="product-page__details-text" content={product.description} />
          </div>
        </div>
      );
    }
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
    addToCart: (value) => dispatch(addToCart(value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
