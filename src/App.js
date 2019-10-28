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
      isLoaded: true,
      city: {},
      cities: []
    };
    this.baseUrl = "http://api.geonames.org/searchJSON?";
    this.searchUrl = "";
  }

  handleSearchSelection = searchBy => {
    this.setState({ action: "search", searchType: searchBy });
  };

  handleSearch = keyword => {
    if (this.state.searchType === "City") {
      this.searchUrl =
        this.baseUrl +
        "name_equals=" +
        keyword +
        "&featureClass=P&maxRows=1&username=weknowit";
      this.callAPI(true);
      this.setState({ action: "city" });
    } else {
      this.searchUrl =
        this.baseUrl +
        "q=" +
        keyword +
        "&featureClass=P&orderby=population&maxRows=3&username=weknowit";
      this.callAPI(false);
      this.setState({ action: "country" });
    }
  };

  handleCitySelection = selected => {
    this.setState({ city: selected.city, action: "city" });
  };

  callAPI(isSingleCity) {
    fetch(this.searchUrl)
      .then(res => res.json())
      .then(
        result => {
          this.setState(
            isSingleCity
              ? {
                  isLoaded: true,
                  city: result.geonames[0]
                }
              : { isLoaded: true, cities: result.geonames }
          );
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  renderContent() {
    const { error, isLoaded, action, city, cities } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (action === "selection")
      return <Selector onSelection={this.handleSearchSelection} />;
    else if (action === "search")
      return (
        <Search
          onSearch={this.handleSearch}
          searchType={this.state.searchType}
        />
      );
    else if (action === "city") return <City city={city} />;
    else if (action === "country")
      return <Country onSelection={this.handleCitySelection} cities={cities} />;
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
