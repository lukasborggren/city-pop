import React, { Component } from "react";

class City extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.name}</h3>
        <h5>Population: {this.props.population}</h5>
      </div>
    );
  }
}

export default City;
