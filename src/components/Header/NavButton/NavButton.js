import React from "react";
import "./NavButton.css";

export class NavButton extends React.Component {
  render() {
    return (
      <button
        className={this.props.isActive ? "myButton active" : "myButton"}
        onClick={this.props.onClick}
        dummy={this.props.value}
      >
        {this.props.value}
      </button>
    );
  }
}
