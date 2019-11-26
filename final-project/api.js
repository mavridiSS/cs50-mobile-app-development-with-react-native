const API_KEY = "cKczm4x01NzXPzrWU8lL2qGOFeZR25g3S7BosFBh";
const API_BASE_URL = "https://developer.nps.gov/api/v1";

export const fetchNationalParks = async (stateCode, limit = 50) => {
  const url = `${API_BASE_URL}/parks?stateCode=${stateCode}&limit=${limit}&fields=images,entranceFees&api_key=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
};
