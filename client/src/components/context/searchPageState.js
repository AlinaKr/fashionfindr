import React, { useReducer, useEffect } from 'react';

import SearchPageContext from './searchPageContext';
import searchPageReducer from './searchPageReducer';
import api from "../../api";

const SearchPageState = props => {
  const initialState = {
    searchInput: "",
    searchFilter: "Default",
    offset: 0,
    limit: 30,
    currentPage: 1,
    loading: false,
    results: null,
    resultsTotal: null,
    err: ""
  };

  const [state, dispatch] = useReducer(searchPageReducer, initialState);

  const _isValidSearch = () => {
    return state.searchInput.length !== 0;
  }

  const _updatePage = currPage => {
    if (_isValidSearch()) {
      dispatch({ type: "UPDATE_PAGE", payload: currPage })
    }
  };

  useEffect(() => {
    if (state.loading) {
      _conductSearch();
    }
  }, [state.offset, state.currentPage]);

  const _conductSearch = async () => {
    let data = {
      search: state.searchInput,
      filter: state.searchFilter,
      offset: state.offset,
      limit: state.limit,
    };

    api
      .searchFashionItems(data)
      .then(results => {
        dispatch({ type: "SEARCH_SUCCESS", payload: results })
      })
      .catch(err => {
        console.log(err)
        dispatch({ type: "SEARCH_FAIL", payload: err })
      });
  }

  const _onSubmit = e => {
    e.preventDefault();
    dispatch({ type: "SUBMIT_SEARCH" })
    _conductSearch();
  };

  const _onChange = e => {
    if (typeof e === "object") {
      e.preventDefault();
      dispatch({ type: "UPDATE_INPUT", payload: { name: e.target.name, value: e.currentTarget.value } })
    } else {
      dispatch({ type: "UPDATE_INPUT", payload: { name: "searchFilter", value: e } })
    }
  };

  return (
    <SearchPageContext.Provider
      value={{
        searchInput: state.searchInput,
        searchFilter: state.searchFilter,
        offset: state.offset,
        limit: state.limit,
        currentPage: state.currentPage,
        loading: state.loading,
        results: state.results,
        resultsTotal: state.resultsTotal,
        err: state.err,
        _updatePage: _updatePage,
        _conductSearch: _conductSearch,
        _onSubmit: _onSubmit,
        _onChange: _onChange

      }}>
      {props.children}
    </SearchPageContext.Provider>
  )
}

export default SearchPageState