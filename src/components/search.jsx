import React, { Component } from "react";
import "../App.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { keyword: "" };
    this.placeHolder = "Enter a " + this.props.searchType.toLowerCase();
  }

  componentDidMount() {
    this.refs.searchBar.focus();
  }

  updateKeyword(evt) {
    this.setState({
      keyword: evt.target.value
    });
  }

  render() {
    return (
      <div>
        <h3 className="sub-header">Search by {this.props.searchType}</h3>
        <form onSubmit={() => this.props.onSearch(this.state.keyword)}>
          <input
            ref="searchBar"
            type="text"
            className="form-control search-field"
            placeholder={this.placeHolder}
            onChange={evt => this.updateKeyword(evt)}
          />
          <button type="submit" className="btn btn-round" />
        </form>
      </div>
    );
  }
}

export default Search;
