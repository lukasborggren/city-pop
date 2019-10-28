import React, { Component } from "react";

class Search extends Component {
  render() {
    return (
      <div>
        <h2>Search by {this.props.searchType}</h2>
      </div>
    );
  }
}

export default Search;
