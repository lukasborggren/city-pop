import React, { Component } from "react";
import "../App.css";

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
