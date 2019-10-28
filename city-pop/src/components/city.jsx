import React, { Component } from "react";

class City extends Component {
  name = this.props.item;
  render() {
    return (
      <div>
        {this.props.city.map(c => (
          <span key={c.name}>
            <h2>{c.name}</h2>
            <h4>Population: {c.population}</h4>
          </span>
        ))}
      </div>
    );
  }
}

export default City;
