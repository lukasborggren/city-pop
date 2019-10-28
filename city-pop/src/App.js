import React, { Component } from "react";
import "./App.css";
import Selector from "./components/selector";
import Search from "./components/search";

class App extends Component {
  state = {
    isSearching: false,
    searchType: ""
  };

  constructor(props) {
    super(props);
    this.state = { isSearching: false };
  }

  handleSelection = searchBy => {
    this.setState({ isSearching: true });
    this.setState({ searchType: searchBy });
  };

  renderContent() {
    if (!this.state.isSearching)
      return <Selector onSelection={this.handleSelection} />;
    else return <Search searchType={this.state.searchType} />;
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
