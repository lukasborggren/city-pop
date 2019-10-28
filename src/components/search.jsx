import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { keyword: "" };
    this.placeHolder = "Enter a " + this.props.searchType.toLowerCase();
  }

  updateKeyword(evt) {
    this.setState({
      keyword: evt.target.value
    });
  }

  render() {
    return (
      <div>
        <h2>Search by {this.props.searchType}</h2>
        <form>
          <input
            type="text"
            className="form-control"
            placeholder={this.placeHolder}
            onChange={evt => this.updateKeyword(evt)}
          />
          <button
            type="button"
            onClick={() => this.props.onSearch(this.state.keyword)}
            className="btn btn-primary mt-2"
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
