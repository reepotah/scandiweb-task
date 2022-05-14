import { client } from "@tilework/opus";
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
    let id = arr[arr.length - 1];
    client.post(GET_PRODUCT_BY_ID(id)).then((result) => {
      let { product } = result;
      if (!product) this.setState({ noProduct: true });
      else {
        let preSelect = {};
        product.attributes.map((attribute) => {
          preSelect[attribute.type + ":" + attribute.id] = attribute.items[0].id;
        });
        this.setState({
          product: product,
          image: product.gallery[0],
          selected: preSelect,
        });
      }
    });
  }

  renderGalleryButton(image, id) {
    return (
      <div
        key={id}
        className="galleryButton"
        onClick={() => {
          this.handleGalleryButtonClick(image);
        }}
      >
        <img className="galleryButtonThumbnail" src={image} />
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
        <div className="pageContainer">
          <div className="galleryContainer">
            <div className="gallerySelector">
              {product.gallery.map((img, index) => {
                return this.renderGalleryButton(img, index);
              })}
            </div>

            <div className="galleryDisplay">
              <img className="galleryDisplayImage" src={this.state.image} />
            </div>
          </div>
          <div className="detailsContainer">
            <div className="detailsTitle">
              <b>{product.brand}</b>
              <br /> {product.name}
            </div>
            <div className="detailsAttributeContainer">
              <AttributeSelector
                attributes={product.attributes}
                selected={this.state.selected}
                onClick={this.onAttributeClick}
              />
            </div>
            <div className="detailsPrice">Price:</div>
            <div className="detailsPriceValue">{price}</div>
            <div className="detailsAddToCart">
              {product.inStock ? (
                <button
                  className="addToCartButton"
                  onClick={() => {
                    this.hadnleAddToCartButtonClick();
                  }}
                >
                  ADD TO CART
                </button>
              ) : (
                <button className="addToCartButton outOfStock">OUT OF STOCK</button>
              )}
            </div>
            <div
              className="detailsText"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
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
