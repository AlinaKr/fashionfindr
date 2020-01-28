import React, { useRef } from "react";
import RadioButton from "../pages/RadioButton"

const Form = ({ searchInput, active, _onChange, _toggleClass, searchFilter, _onSubmit }) => {
  const inputRef = useRef(null);
  const inputKeyDown = (e) => {
    if (e.key === "Enter") {
      _onSubmit(e)
    }
  }

  return (
    <form
      autoComplete="off"
      onSubmit={_onSubmit}
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
        onClick={_toggleClass}
      />
      <input
        type="text"
        className={active ? "input-opened" : ""}
        style={{ width: active ? "250px" : "0px" }}
        name="searchInput"
        value={searchInput}
        placeholder="Enter a garment..."
        onChange={_onChange}
        ref={inputRef}
        onKeyDown={inputKeyDown}
      />
      {active && (
        <div className="radio-wrapper">
          <RadioButton searchFilter={searchFilter} _onChange={_onChange} sortValue="Default" />
          <RadioButton searchFilter={searchFilter} _onChange={_onChange} sortValue="Low To High" />
          <RadioButton searchFilter={searchFilter} _onChange={_onChange} sortValue="High To Low" />
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
  )
};

export default Form;
