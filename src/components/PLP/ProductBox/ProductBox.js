import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { cartIcon } from "../../../assets/assets";
import "./ProductBox.css";

export default class ProductBox extends Component {
  render() {
    return (
      <div className="productBoxContainer">
        <Link
          to={`/productDetails/${this.props.id}`}
          className={"productBox" + (!this.props.inStock ? " outOfStock" : "")}
        >
          <div className="imageContainer">
            <img className="productImage" src={this.props.image} alt={this.props.name} />
            <div className="outOfStockText">{!this.props.inStock ? "Out of stock" : ""}</div>
          </div>
          <div className="productBoxName">{this.props.name}</div>
          <div className="productBoxPrice">{this.props.price}</div>
        </Link>
        <div
          className="productCartButton"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div style={{ width: "inherit", height: "inherit" }} onClick={this.props.onCartClick}>
            <img
              className="productCartButtonIcon"
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
