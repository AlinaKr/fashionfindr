import React, { Component } from "react";
import "../../../../node_modules/font-awesome/css/font-awesome.min.css";
import "../../style/SearchQuery.scss";
import SearchQueryResults from "../pages/SearchQueryResults";
import api from "../../api";

export default class SearchQuery extends Component {
  constructor(props) {
    super(props);
    this._toggleClass = this._toggleClass.bind(this);
    this.state = {
      active: false,
      searchInput: "",
      searchFilter: "default",
      err: "",
      loading: false,
      results: null
    };
  }

  render() {
    const { searchInput, results, loading } = this.state;
    return (
      <div className="search-wrapper">
        <form
          onSubmit={this._onSubmit}
          style={{
            display: !this.state.active && "flex",
            justifyContent: !this.state.active && "center"
          }}
        >
          <i
            className={
              this.state.active
                ? "fa fa-search search-icon-opened"
                : "fa fa-search"
            }
            onClick={this._toggleClass}
          />
          <input
            type="text"
            className={this.state.active ? "input-opened" : ""}
            style={{ width: this.state.active ? "250px" : "0px" }}
            name="searchInput"
            value={searchInput}
            placeholder="Enter a garment..."
            onChange={this._onChange}
          />
          {this.state.active && (
            <div className="radio-wrapper">
              <label className="radio-btn" htmlFor="">
                <input
                  type="radio"
                  value="default"
                  name="searchFilter"
                  checked={this.state.searchFilter === "default"}
                  onChange={this._onChange}
                />
                <i
                  className="fa fa-circle-o"
                  aria-hidden="true"
                  onClick={() => this.setState({ searchFilter: "default" })}
                />
                <span>Default</span>
              </label>
              <label className="radio-btn" htmlFor="">
                <input
                  type="radio"
                  value="ascendingPrice"
                  name="searchFilter"
                  checked={this.state.searchFilter === "ascendingPrice"}
                  onChange={this._onChange}
                />
                <i
                  className="fa fa-circle-o"
                  aria-hidden="true"
                  onClick={() =>
                    this.setState({ searchFilter: "ascendingPrice" })
                  }
                />
                <span>Price: Low to High</span>
              </label>
              <label className="radio-btn" htmlFor="">
                <input
                  type="radio"
                  value="descendingPrice"
                  name="searchFilter"
                  checked={this.state.searchFilter === "descendingPrice"}
                  onChange={this._onChange}
                />
                <i
                  className="fa fa-circle-o"
                  aria-hidden="true"
                  onClick={() =>
                    this.setState({ searchFilter: "descendingPrice" })
                  }
                />
                <span>Price: High to Low</span>
              </label>
            </div>
          )}
          <input
            type="submit"
            className={this.state.active ? "submit submit-active" : "submit"}
            value="Search"
            disabled={!searchInput}
            style={{ display: this.state.active && "inline-block" }}
          />
        </form>
        {this.state.searchInput && (
          <SearchQueryResults results={results} loading={loading} />
        )}
      </div>
    );
  }

  _toggleClass() {
    let current = this.state.active;
    this.setState({ active: !current });
  }

  _onSubmit = e => {
    e.preventDefault();

    if (!this.state.searchInput) {
      this.setState({ results: null, loading: false });
      return;
    }

    let data = {
      search: this.state.searchInput,
      filter: this.state.searchFilter
    };

    this.setState({ loading: true });

    api
      .searchFashionItems(data)
      .then(results => {
        this.setState({
          results: results,
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          err: err.description
        });
      });
  };

  _onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.currentTarget.value });
    if (!this.state.searchInput) {
      this.setState({ results: null, loading: false });
      return;
    }

    let data = {
      search: this.state.searchInput,
      filter: this.state.searchFilter
    };

    this.setState({ loading: true });

    api
      .searchFashionItems(data)
      .then(results => {
        this.setState({
          results: results,
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          err: err.description
        });
      });
  };
}
