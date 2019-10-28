import React, { Component } from "react";

class Country extends Component {
  constructor(props) {
    super(props);
    this.first = this.props.cities[0];
  }
  render() {
    return (
      <div>
        <h2>Country</h2>
        {this.props.cities.map(city => (
          <p key={city.name}>
            <button
              className="btn btn-dark btn-xl"
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
