import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { cartIcon } from "../../../assets/assets";
import "./ProductBox.css";

export default class ProductBox extends Component {
  render() {
    let tag = !this.props.inStock ? " --out-of-stock" : "";
    return (
      <div className={"product-box" + tag}>
        <Link to={`/productDetails/${this.props.id}`} className="product-box__body">
          <div className="product-box__image-container">
            <img className="product-box__image" src={this.props.image} alt={this.props.name} />
            <div className="product-box__out-of-stock-text">
              {!this.props.inStock ? "Out of stock" : ""}
            </div>
          </div>
          <div className="product-box__name">{this.props.name}</div>
          <div className="product-box__price">{this.props.price}</div>
        </Link>
        <div
          className="product-box__cart-button"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div style={{ width: "inherit", height: "inherit" }} onClick={this.props.onCartClick}>
            <img
              className="product-box__cart-button-icon"
              src={cartIcon}
              onDragStart={(e) => {
                e.preventDefault();
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
