import React, { Component } from "react";
import "./App.css";
import Selector from "./components/selector";
import Search from "./components/search";

class App extends Component {
  state = {
    Selector,
    Search
  };

  constructor(props) {
    super(props);
    this.state = { isSearching: false };
  }

  handleSelection = searchBy => {
    console.log("Search by " + searchBy);
    this.setState({ isSearching: true });
  };

  render() {
    const isSearching = this.state.isSearching;

    let content = null;
    if (!isSearching) {
      content = <Selector onSelection={this.handleSelection} />;
    } else {
      content = <Search>searchType</Search>;
    }
    return (
      <React.Fragment>
        <div className="App">
          <header className="App-header">
            <h1>CityPop</h1>
            {content}
          </header>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
