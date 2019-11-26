import constants from "../const";

const initialState = {
  parks: [],
  isLoading: false,
  errMsg: "",
  settings: {
    sortBy: constants.FILTERS.sortBy.values.Distance,
    priceRange: constants.FILTERS.priceRange.values.Free
  },
  maxPages: 0,
  isLoading: false,
  userLocation: null // currently is just a US state object
};

export default reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_NATIONAL_PARKS_REQUEST":
      return {
        ...state,
        isLoading: true
      };
    case "FETCH_NATIONAL_PARKS_RESPONSE":
      return {
        ...state,
        isLoading: false,
        parks: action.merge
          ? [...state.parks, ...action.payload.data]
          : action.payload.data,
        maxPages: action.maxPages
      };
    case "FETCH_NATIONAL_PARKS_ERROR":
      return {
        ...state,
        isLoading: false,
        errMsg: action.error
      };
    case "UPDATE_SETTINGS":
      return {
        ...state,
        settings: action.settings
      };
    case "UPDATE_USER_LOCATION":
      return {
        ...state,
        userLocation: action.payload
      };
    default:
      return state;
  }
};
