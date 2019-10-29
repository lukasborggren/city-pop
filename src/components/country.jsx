import React, { Component } from "react";
import "../App.css";

/*
Component viewing a country's name and the its three biggest cities.
Clicking a city renders a city component for the specific city.
*/
class Country extends Component {
  render() {
    return (
      <div>
        <h3 className="sub-header">{this.props.name}</h3>
        {this.props.cities.map(city => (
          <p key={city.name}>
            <button
              className="btn btn-dark btn-dark-city"
              value={city.name}
              onClick={() => this.props.onSelection({ city })}
            >
              {city.name}
            </button>
          </p>
        ))}
      </div>
    );
  }
}

export default Country;
