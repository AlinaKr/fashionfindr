import React from "react";
import "../../style/SearchQueryResult.scss";

const SearchQueryResult = ({ brand, image, price, title, url }) => {
  return (
    <div className="list-view-element">
      <div>
        <img src={image} alt="" />
        <button className="animated-info">{price} EUR</button>
      </div>

      <div className="product-info">
        <a href={url}>{title}</a>
        <p>{brand}</p>
      </div>
    </div>
  );
};

export default SearchQueryResult;
