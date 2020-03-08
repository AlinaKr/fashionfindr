import React, { Component } from "react";
import SearchQuery from "./pages/SearchQuery";
import "../style/App.scss";
import SearchFormState from "./context/searchFormState"
import SearchPageState from "./context/searchPageState"

export default class App extends Component {
  render() {
    return (
      <SearchPageState>
        <SearchFormState>
          <div className="App">
            <div className="container">
              <h1>FahionFindr</h1>
              <SearchQuery />
            </div>
          </div>
        </SearchFormState>
      </SearchPageState>
    );
  }
}
