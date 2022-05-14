import React, { Component } from "react";
import "./ErrorPage.css";

export default class ErrorPage extends Component {
  render() {
    return (
      <div className="error-page">
        <div className="error-page-body">{">:["}</div>
        <div>There's no such page.</div>
      </div>
    );
  }
}
