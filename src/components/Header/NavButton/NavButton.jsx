import React from "react";
import { Link } from "react-router-dom";
import "./NavButton.css";

export class NavButton extends React.Component {
  render() {
    return (
      <Link
        to="/"
        className={this.props.isActive ? "nav-button --active" : "nav-button"}
        onClick={this.props.onClick}
        dummy={this.props.value}
      >
        {this.props.value}
      </Link>
    );
  }
}
