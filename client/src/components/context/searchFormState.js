import React, { useReducer } from 'react';

import SearchFormContext from './searchFormContext';
import searchFormReducer from './searchFormReducer';

const SearchFormState = props => {
  const initialState = false;

  const [state, dispatch] = useReducer(searchFormReducer, initialState);

  // Toggle between closed and opened input form
  const _toggleClass = (active, type) => {
    dispatch({
      type: "TOGGLE_CLASS",
      payload: { active, type }
    });
  };

  return (
    <SearchFormContext.Provider
      value={{
        active: state,
        _toggleClass
      }}
    >
      {props.children}
    </SearchFormContext.Provider>
  );
};

export default SearchFormState;