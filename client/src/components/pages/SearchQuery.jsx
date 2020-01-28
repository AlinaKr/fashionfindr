import React, { Component } from "react";
import "../../../../node_modules/font-awesome/css/font-awesome.min.css";
import "../../style/SearchQuery.scss";
import SearchQueryResults from "../pages/SearchQueryResults";
import Pagination from "../pages/Pagination";
import Form from "../pages/SearchInput";
import api from "../../api";

export default class SearchQuery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      searchInput: "",
      searchFilter: "Default",
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
        <Form
          searchInput={searchInput}
          active={active}
          _onChange={this._onChange}
          _toggleClass={this._toggleClass}
          searchFilter={searchFilter}
          _onSubmit={this._onSubmit} />
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
          loading: false,
          err: ""
        });
      })
      .catch(err => {
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
    if (typeof e === "object") {
      e.preventDefault();
      this.setState({ [e.target.name]: e.currentTarget.value });
    } else {
      this.setState({ searchFilter: e })
    }
  };
}
