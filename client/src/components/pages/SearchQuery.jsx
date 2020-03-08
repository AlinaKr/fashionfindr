import React, { useContext } from "react";
import "../../../../node_modules/font-awesome/css/font-awesome.min.css";
import "../../style/SearchQuery.scss";
import SearchQueryResults from "../pages/SearchQueryResults";
import Pagination from "../pages/Pagination";
import SearchInput from "../pages/SearchInput";
import SearchPageContext from '../context/searchPageContext';


const SearchQuery = () => {
  const searchPageContext = useContext(SearchPageContext);
  const { searchInput, searchFilter, loading, results, err, _onSubmit, _onChange } = searchPageContext;

  return (
    <div className="search-wrapper">
      <SearchInput
        searchInput={searchInput}
        _onChange={_onChange}
        searchFilter={searchFilter}
        _onSubmit={_onSubmit} />
      {results && !loading && (
        <Pagination
          pageNeighbours={1}
        />
      )}
      {(results || loading || err) && (
        <SearchQueryResults results={results} loading={loading} err={err} />
      )}
    </div>
  );
}

export default SearchQuery