import React from "react";

const RadioButton = ({ sortValue, searchFilter, _onChange }) => {

  return (

    <label className="radio-btn" htmlFor="">
      <input
        type="radio"
        value={sortValue}
        name="searchFilter"
        checked={searchFilter === sortValue}
        onChange={_onChange}
      />
      <i
        className="fa fa-circle-o"
        aria-hidden="true"
        name="searchFilter"
        value={sortValue}
        //since the onChange events on the radio input buttons wouldn't fire, it had to be hard coded like this
        onClick={() => _onChange(sortValue)}
      />
      <span>{sortValue}</span>
    </label>
  )
}

export default RadioButton;