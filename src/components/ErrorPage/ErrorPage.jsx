import React, { Component } from "react";
import "./ErrorPage.css";

export default class ErrorPage extends Component {
  render() {
    return (
      <div className="errorPageContainer">
        <div className="errorPageBody">{">:["}</div>
        <div>There's no such page.</div>
      </div>
    );
  }
}
