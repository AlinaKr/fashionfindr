
export default (state, action) => {
  switch (action.type) {
    case "TOGGLE_CLASS":
      return !state;
    default:
      return state;
  }
};