const API_KEY = "cKczm4x01NzXPzrWU8lL2qGOFeZR25g3S7BosFBh";
const API_BASE_URL = "https://developer.nps.gov/api/v1";
const LIMIT = 10;

export const fetchNationalParks = params => {
  const { stateCode, page, merge } = params;
  const url = `${API_BASE_URL}/parks?stateCode=${stateCode}&limit=${LIMIT}&start=${page *
    LIMIT +
    1}&fields=images,entranceFees&api_key=${API_KEY}`;
  "dispatching>>", url;
  return dispatch => {
    dispatch({
      type: "FETCH_NATIONAL_PARKS_REQUEST"
    });
    fetch(url)
      .then(resp => resp.json())
      .then(resp => {
        dispatch({
          type: "FETCH_NATIONAL_PARKS_RESPONSE",
          payload: resp,
          maxPages: Math.floor((+resp.total - 1) / LIMIT),
          merge
        });
      })
      .catch(err =>
        dispatch({
          type: "FETCH_NATIONAL_PARKS_ERROR",
          error: err
        })
      );
  };
};

export const updateUserLocation = location => {
  return {
    type: "UPDATE_USER_LOCATION",
    payload: location
  };
};

export const updateSettings = settings => {
  return {
    type: "UPDATE_SETTINGS",
    settings
  };
};
