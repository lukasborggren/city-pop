import React, { Component } from "react";

class City extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
        <h4>Population: {this.props.population}</h4>
      </div>
    );
  }
}

export default City;
