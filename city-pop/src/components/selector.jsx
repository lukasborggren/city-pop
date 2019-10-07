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
          onClick={() => this.onCityClick()}
          className="btn btn-primary btn-lg mr-lg-2"
        >
          Search by city
        </button>
        <button
          onClick={() => this.onCountryClick()}
          className="btn btn-primary btn-lg ml-lg-2"
        >
          Search by country
        </button>
      </div>
    );
  }
}

export default Selector;
