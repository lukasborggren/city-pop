import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { keyword: "", error: null, isLoaded: false, items: [] };
    this.baseUrl = "http://api.geonames.org/searchJSON?";
    this.searchUrl = "";
  }

  updateKeyword(evt) {
    this.setState({
      keyword: evt.target.value
    });
  }

  handleSearch() {
    if (this.props.searchType === "City") {
      this.searchUrl =
        this.baseUrl +
        "name_equals=" +
        this.state.keyword +
        "&maxRows=10&username=weknowit";
      fetch(this.searchUrl)
        .then(res => res.json())
        .then(
          result => {
            console.log(result.geonames);
            this.setState({
              isLoaded: true,
              items: result.geonames
            });
          },
          error => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        );
    }
    console.log(this.items);
  }

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            className="form-control"
            placeholder={this.props.searchType}
            onChange={evt => this.updateKeyword(evt)}
          />
          <button
            type="button"
            onClick={() => this.handleSearch()}
            className="btn btn-primary mt-2"
          >
            Search
          </button>
        </form>
        <ul>
          {this.state.items.map(item => (
            <li key={item.name}>
              {item.name} {item.population}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Search;
