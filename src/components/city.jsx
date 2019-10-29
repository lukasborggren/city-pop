import React, { Component } from "react";
import NumberFormat from "react-number-format";
import "../App.css";

/*
Component viewing a city's name and its population.
*/
class City extends Component {
  render() {
    return (
      <div>
        <h3 className="sub-header">{this.props.name}</h3>
        <div className="population-box">
          <p className="population-header">Population</p>
          <NumberFormat
            className="sub-header"
            value={this.props.population}
            displayType={"text"}
            thousandSeparator={" "}
          />
        </div>
      </div>
    );
  }
}

export default City;
