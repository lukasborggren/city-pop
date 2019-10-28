import React, { Component } from "react";
import "./App.css";
import Selector from "./components/selector";
import Search from "./components/search";

class App extends Component {
  baseURL = "http://api.geonames.org/searchJSON?";

  constructor(props) {
    super(props);
    this.state = { isSearching: false, searchType: "", searchUrl: "" };
  }

  handleSelection = searchBy => {
    this.setState({ isSearching: true, searchType: searchBy });
  };

  handleSearch = keyword => {
    console.log(keyword);
    this.setState({ searchUrl: this.baseURL + keyword });
  };

  renderContent() {
    if (!this.state.isSearching)
      return <Selector onSelection={this.handleSelection} />;
    else
      return (
        <Search
          //onSearch={this.handleSearch}
          searchType={this.state.searchType}
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
