import React, { Component } from "react";
import "../App.css";

/*
Component handling the search functionality.
 */
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

  //Sets the search bar in focus.
  componentDidMount() {
    this.refs.searchBar.focus();
  }

  //Updates the search keyword every time the value of the input form changes.
  updateKeyword(e) {
    this.setState({
      keyword: e.target.value
    });
  }

  //Handles the search when either enter or the search button is pressed.
  submitHandler = e => {
    e.preventDefault();
    this.props.onSearch(this.state.keyword);
  };

  //Checks if the search is valid.
  checkForError() {
    if (this.props.error) {
      return <p className="error-text">{this.errorMessage}</p>;
    }
  }

  render() {
    return (
      <div>
        <h3 className="sub-header">Search by {this.props.searchType}</h3>
        <form onSubmit={this.submitHandler}>
          <input
            ref="searchBar"
            className="form-control search-field"
            type="text"
            placeholder={this.placeHolder}
            onChange={e => this.updateKeyword(e)}
          />
          <button type="submit" className="btn btn-round" />
        </form>
        {this.checkForError()}
      </div>
    );
  }
}

export default Search;
