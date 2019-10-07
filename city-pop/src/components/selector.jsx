import React, { Component } from "react";

class Selector extends Component {
  onCityClick() {
    console.log("City");
  }

  onCountryClick() {
    console.log("Country");
  }

  render() {
    return (
      <div>
        <button
          onClick={() => this.props.onSelection("City")}
          className="btn btn-primary btn-lg mr-lg-2"
        >
          Search by City
        </button>
        <button
          onClick={() => this.props.onSelection("Country")}
          className="btn btn-primary btn-lg ml-lg-2"
        >
          Search by Country
        </button>
      </div>
    );
  }
}

export default Selector;
