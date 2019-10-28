import React, { Component } from "react";
import "./selection.css";

class Selection extends Component {
  render() {
    return (
      <div>
        <button
          onClick={() => this.props.onSelection("City")}
          className="btn btn-dark btn-dark-custom mr-2"
        >
          Search by City
        </button>
        <button
          onClick={() => this.props.onSelection("Country")}
          className="btn btn-dark btn-dark-custom ml-2"
        >
          Search by Country
        </button>
      </div>
    );
  }
}

export default Selection;
