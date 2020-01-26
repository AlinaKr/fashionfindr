import React, { Component } from "react";
import SearchQuery from "./pages/SearchQuery";
import "../style/App.scss";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>Full Stack Challenge</h1>
          <SearchQuery />
        </div>
      </div>
    );
  }
}
