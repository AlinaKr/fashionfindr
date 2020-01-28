import React from "react";
import "../../style/SearchQueryResults.scss";
import SearchQueryResult from "../pages/SearchQueryResult";

const SearchQueryResults = ({ results, loading, err }) => {
  if (loading) return <div className="alternative-text" id="loading">LOADING</div>;

  if (err !== "") return <div className="alternative-text">An error has occured. Please try again later</div>;

  if (results.length === 0) return <div className="alternative-text">No matching results</div>;

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
