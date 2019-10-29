import React, { Component } from "react";
import "./App.css";
import LoadingBar from "react-top-loading-bar";
import Selection from "./components/selection";
import Search from "./components/search";
import City from "./components/city";
import Country from "./components/country";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingBarProgress: 0,
      action: "selection",
      searchType: "",
      error: null,
      isLoaded: true,
      cities: []
    };
    this.baseUrl = "http://api.geonames.org/searchJSON?";
    this.searchUrl = "";
  }

  handleSearchSelection = searchBy => {
    this.setState({ action: "search", searchType: searchBy });
  };

  handleSearch = keyword => {
    this.setState({ isLoaded: false, loadingBarProgress: 80 });
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
    this.setState({ loadingBarProgress: 100 });
  };

  handleCitySelection = selected => {
    this.setState({
      cities: [selected.city],
      action: "city"
    });
  };

  callAPI() {
    fetch(this.searchUrl)
      .then(res => res.json())
      .then(
        result => {
          console.log(result.geonames);
          this.setState({
            isLoaded: true,
            cities: result.geonames
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

  onLoaderFinished = () => {
    this.setState({ loadingBarProgress: 0 });
  };

  renderContent() {
    const { error, isLoaded, action, cities } = this.state;
    if (isLoaded) {
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (action === "selection") {
        return <Selection onSelection={this.handleSearchSelection} />;
      } else if (action === "search") {
        return (
          <Search
            onSearch={this.handleSearch}
            searchType={this.state.searchType}
          />
        );
      } else if (action === "city") {
        return <City name={cities[0].name} population={cities[0].population} />;
      } else if (action === "country") {
        return (
          <Country
            onSelection={this.handleCitySelection}
            name={cities[0].countryName}
            cities={cities}
          />
        );
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <LoadingBar
            progress={this.state.loadingBarProgress}
            height={4}
            color="rgb(41, 120, 160)"
            onLoaderFinished={() => this.onLoaderFinished()}
          />
          <header className="App-header">
            <h1>
              <a className="header-link" href={"/"}>
                CityPop
              </a>
            </h1>
          </header>
          <div className="App-content">{this.renderContent()}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
