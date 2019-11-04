import React, { Component } from "react";
import LoadingBar from "react-top-loading-bar";
import Selection from "./components/selection";
import Search from "./components/search";
import City from "./components/city";
import Country from "./components/country";
import "./App.css";

/*
The app main component, handling the majority of all logic and rendering.
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      isLoaded: true,
      action: "selection",
      loadingBarProgress: 0,
      searchType: "",
      cities: []
    };
    this.baseUrl = "http://api.geonames.org/searchJSON?";
    this.searchUrl = "";
  }

  //Specifies what type of search is to be made.
  handleSearchSelection = searchBy => {
    this.setState({ action: "search", searchType: searchBy });
  };

  //Handles the search procedure by forming an eligible URL and starting the loading bar.
  handleSearch = keyword => {
    if (keyword.trim() === "") this.setState({ error: true });
    else {
      this.setState({ error: false, isLoaded: false, loadingBarProgress: 80 });
      if (this.state.searchType === "City") {
        this.searchUrl =
          this.baseUrl +
          "name_equals=" +
          keyword +
          "&featureClass=P&maxRows=1&username=weknowit";
        this.callAPI("city");
      } else {
        this.searchUrl =
          this.baseUrl +
          "q=" +
          keyword +
          "&featureClass=P&orderby=population&maxRows=3&username=weknowit";
        this.callAPI("country");
      }
      this.setState({ loadingBarProgress: 100 });
    }
  };

  //Utilizes the search URL to retrieve city/cities from API.
  callAPI(action) {
    fetch(this.searchUrl)
      .then(res => res.json())
      .then(
        result => {
          console.log(result.geonames);
          this.setState(
            result.geonames.length
              ? {
                  isLoaded: true,
                  action: action,
                  cities: result.geonames
                }
              : {
                  error: true,
                  isLoaded: true
                }
          );
        },
        () => {
          this.setState({
            error: true,
            isLoaded: true
          });
        }
      );
  }

  //Handles the selection of a city in a country.
  handleCitySelection = selected => {
    this.setState({
      action: "city",
      cities: [selected.city]
    });
  };

  //Specifies the action when the loading bar is finished.
  onLoaderFinished = () => {
    this.setState({ loadingBarProgress: 0 });
  };

  //Conditionally renders main content based on the current state's action.
  renderContent() {
    const { error, isLoaded, action, cities, searchType } = this.state;
    if (isLoaded) {
      if (action === "selection") {
        return <Selection onSelection={this.handleSearchSelection} />;
      } else if (action === "search") {
        return (
          <Search
            error={error}
            onSearch={this.handleSearch}
            searchType={searchType}
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
