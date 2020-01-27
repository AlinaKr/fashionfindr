import React, { Component } from "react";
import "../../../../node_modules/font-awesome/css/font-awesome.min.css";
import "../../style/SearchQuery.scss";
import SearchQueryResults from "../pages/SearchQueryResults";
import Pagination from "../pages/Pagination";
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
      results: null,
      resultsTotal: null,
      offset: 0,
      limit: 30,
      currentPage: 1,
    };
  }

  render() {
    const { active, searchInput, searchFilter, loading, results, resultsTotal, offset, limit, currentPage, err } = this.state;

    return (
      <div className="search-wrapper">
        <form
          onSubmit={this._onSubmit}
          style={{
            display: !active && "flex",
            justifyContent: !active && "center"
          }}
        >
          <i
            className={
              active
                ? "fa fa-search search-icon-opened"
                : "fa fa-search"
            }
            onClick={this._toggleClass}
          />
          <input
            type="text"
            className={active ? "input-opened" : ""}
            style={{ width: active ? "250px" : "0px" }}
            name="searchInput"
            value={searchInput}
            placeholder="Enter a garment..."
            onChange={this._onChange}
          />
          {active && (
            <div className="radio-wrapper">
              <label className="radio-btn" htmlFor="">
                <input
                  type="radio"
                  value="default"
                  name="searchFilter"
                  checked={searchFilter === "default"}
                  onChange={this._onChange}
                />
                <i
                  className="fa fa-circle-o"
                  aria-hidden="true"
                  //since the onChange events on the radio input buttons wouldn't fire, it had to be hard coded like this
                  onClick={() => this.setState({ searchFilter: "default" })}
                />
                <span>Default</span>
              </label>
              <label className="radio-btn" htmlFor="">
                <input
                  type="radio"
                  value="ascendingPrice"
                  name="searchFilter"
                  checked={searchFilter === "ascendingPrice"}
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
                  checked={searchFilter === "descendingPrice"}
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
            className={active ? "submit submit-active" : "submit"}
            value="Search"
            disabled={!searchInput}
            style={{ display: active && "inline-block" }}
          />
        </form>
        {results && !loading && (
          <Pagination
            offset={offset}
            limit={limit}
            resultsTotal={resultsTotal}
            pageNeighbours={1}
            currentPage={currentPage}
            _updatePage={this._updatePage}
          />
        )}
        {(results || loading || err) && (
          <SearchQueryResults results={results} loading={loading} err={err} />
        )}
      </div>
    );

  }

  _toggleClass = () => {
    let current = this.state.active;
    this.setState({ active: !current });
  }

  _updatePage = currPage => {
    const newOffset = this.state.limit * (currPage - 1);
    this.setState({ offset: newOffset, currentPage: currPage }, () => this._conductSearch());
  };

  _conductSearch = async () => {
    let data = {
      search: this.state.searchInput,
      filter: this.state.searchFilter,
      offset: this.state.offset,
      limit: this.state.limit,
    };

    await this.setState({ loading: true });

    api
      .searchFashionItems(data)
      .then(results => {
        this.setState({
          // remove last element of result array, which contains the total number of search results info
          results: results.slice(0, results.length - 1),
          resultsTotal: results.pop().resultsTotal,
          loading: false
        });
      })
      .catch(err => {
        console.log("error has occurrred!", err.description)
        this.setState({
          err: err,
          results: null,
          loading: false
        });
      });
  }

  _onSubmit = e => {
    e.preventDefault();

    if (!this.state.searchInput) {
      this.setState({ results: null, loading: false });
      return;
    }

    this.setState({ offset: 0, currentPage: 1 }, () => { this._conductSearch() });
  };

  _onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.currentTarget.value });
  };
}
