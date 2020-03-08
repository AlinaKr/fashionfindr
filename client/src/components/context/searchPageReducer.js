export default (state, action) => {
  switch (action.type) {
    case "UPDATE_PAGE":
      return {
        ...state,
        offset: state.limit * (action.payload - 1),
        currentPage: action.payload,
        loading: true
      };
    case "UPDATE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SUBMIT_SEARCH":
      return {
        ...state,
        offset: 0,
        currentPage: 1,
        loading: true
      }
    case "SEARCH_SUCCESS":
      const results = [...action.payload];
      return {
        ...state,
        results: results.slice(0, results.length - 1),
        resultsTotal: results.pop().resultsTotal,
        loading: false,
        err: ""
      };
    case "SEARCH_FAIL":
      return {
        ...state,
        err: action.payload,
        results: null,
        loading: false
      }
    default:
      return state;
  }
};