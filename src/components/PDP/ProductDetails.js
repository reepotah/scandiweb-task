import { client } from "@tilework/opus";
import React, { Component } from "react";
import { connect } from "react-redux";
import { GET_PRODUCT_BY_ID } from "../../api/queries";
import "./ProductDetails.css";

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: undefined,
      image: "",
      selected: [],
    };
  }
  hadnleAddToCartButtonClick() {
    /*TODO*/
  }
  handleAttributeButtonClick(index, index2) {
    /*TODO*/
  }
  handleGalleryButtonClick(image) {
    this.setState({ image: image });
  }
  componentDidMount() {
    let arr = window.location.pathname.split("/");
    let id = arr[arr.length - 1];
    client.post(GET_PRODUCT_BY_ID(id)).then((result) => {
      let { product } = result;
      this.setState({ product: product });
      this.setState({ image: product.gallery[0] });
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
  renderAttributeSelectors(product) {
    /*TODO*/
    let string = product.attributes.map((item, index) => {
      switch (item.type) {
        case "text":
          return (
            <>
              <div key={index + "labelT"} className="attributeLabel">
                {item.name}
              </div>
              <div key={index + "valueT"} className="textAttributeContainer">
                {item.items.map((id, index2) => {
                  return (
                    <div key={index2} className="textAttributeButton">
                      {id.displayValue}
                    </div>
                  );
                })}
              </div>
            </>
          );
        case "swatch":
          return (
            <>
              <div key={index + "labelSW"} className="attributeLabel">
                {item.name}
              </div>
              <div key={index + "valueSW"} className="swatchAttributeContainer">
                {item.items.map((id, index) => {
                  return (
                    <div
                      key={index}
                      style={{ backgroundColor: id.value }}
                      className={"swatchAttributeButton"}
                    />
                  );
                })}
              </div>
            </>
          );

        default:
          return;
      }
    });
    return string;
  }
  render() {
    let product = this.state.product;
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
              {this.renderAttributeSelectors(product)}
            </div>
            <div className="detailsPrice">Price:</div>
            <div className="detailsPriceValue">{price}</div>
            <div className="detailsAddToCart">
              {product.inStock ? (
                <button className="addToCartButton">ADD TO CART</button>
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
export default connect(mapStateToProps)(ProductDetails);
