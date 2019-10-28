import React, { Component } from "react";

class Selector extends Component {
  render() {
    return (
      <div>
        <button
          onClick={() => this.props.onSelection("City")}
          className="btn btn-primary btn-lg mr-2"
        >
          Search by City
        </button>
        <button
          onClick={() => this.props.onSelection("Country")}
          className="btn btn-primary btn-lg ml-2"
        >
          Search by Country
        </button>
      </div>
    );
  }
}

export default Selector;
