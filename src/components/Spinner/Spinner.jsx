import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import "./Spinner.css";

class Spinner extends Component {
  render() {
    return (
      <div className="spinner">
        {this.props.category && <Navigate to={"categories/" + this.props.category} />}Loading...
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { data } = state;
  return {
    category: data.currentCategory,
  };
};
export default connect(mapStateToProps, null)(Spinner);
