import React, { Component } from "react";
import "./App.css";
import Selector from "./components/selector";
import Search from "./components/search";
import City from "./components/city";
import Country from "./components/country";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: "selection",
      searchType: "",
      error: null,
      isLoaded: false,
      items: []
    };
    this.baseUrl = "http://api.geonames.org/searchJSON?";
    this.searchUrl = "";
  }

  handleSelection = searchBy => {
    this.setState({ action: "search", searchType: searchBy });
  };

  handleSearch = keyword => {
    if (this.state.searchType === "City") {
      this.searchUrl =
        this.baseUrl +
        "name_equals=" +
        keyword +
        "&featureClass=P&maxRows=1&username=weknowit";
      this.callAPI();
      this.setState({ action: "city" });
    } else {
      this.searchUrl =
        this.baseUrl +
        "q=" +
        keyword +
        "&featureClass=P&orderby=population&maxRows=3&username=weknowit";
      this.callAPI();
      this.setState({ action: "country" });
    }
    console.log(this.state.items);
  };

  callAPI() {
    fetch(this.searchUrl)
      .then(res => res.json())
      .then(
        result => {
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

  handleCountrySel = () => {
    this.setState({ action: "city" });
  };

  renderContent() {
    if (this.state.action === "selection")
      return <Selector onSelection={this.handleSelection} />;
    else if (this.state.action === "search")
      return (
        <Search
          onSearch={this.handleSearch}
          searchType={this.state.searchType}
        />
      );
    else if (this.state.action === "city")
      return <City city={this.state.items} />;
    else if (this.state.action === "country")
      return (
        <Country
          onSelection={this.handleCountrySel}
          cities={this.state.items}
        />
      );
  }

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <header className="App-header">
            <h1>CityPop</h1>
            {this.renderContent()}
          </header>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
