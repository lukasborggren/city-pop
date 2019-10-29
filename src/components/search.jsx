import React, { Component } from "react";
import "../App.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { keyword: "" };
    this.placeHolder = "Enter a " + this.props.searchType.toLowerCase();
    this.errorMessage =
      "The " +
      this.props.searchType.toLowerCase() +
      " couldn't be found – try again";
  }

  componentDidMount() {
    this.refs.searchBar.focus();
    console.log("mounted");
  }

  updateKeyword(evt) {
    this.setState({
      keyword: evt.target.value
    });
  }

  checkForError() {
    if (this.props.error) {
      return <p className="error-text">{this.errorMessage}</p>;
    }
  }

  render() {
    return (
      <div>
        <h3 className="sub-header">Search by {this.props.searchType}</h3>
        <form>
          <input
            ref="searchBar"
            className="form-control search-field"
            type="text"
            placeholder={this.placeHolder}
            onChange={evt => this.updateKeyword(evt)}
          />
          <button
            type="button"
            className="btn btn-round"
            onClick={() => this.props.onSearch(this.state.keyword)}
          />
        </form>
        {this.checkForError()}
      </div>
    );
  }
}

export default Search;
