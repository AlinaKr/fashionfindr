import React from "react";
import "../../style/SearchQueryResults.scss";
import SearchQueryResult from "../pages/SearchQueryResult";
// import { List, AutoSizer } from "react-virtualized";

const SearchQueryResults = ({ results, loading }) => {
  if (loading) return <div id="loading-text">LOADING</div>;

  if (!results && !loading) return null;

  const queryComponents = results.map((el, i) => (
    <SearchQueryResult
      brand={el.brand}
      gender={el.gender}
      image={el.image}
      price={el.price}
      title={el.product_title}
      url={el.url}
      index={i}
      key={el._id}
    />
  ));

  return <div className="list-view">{queryComponents}</div>;
};

export default SearchQueryResults;
