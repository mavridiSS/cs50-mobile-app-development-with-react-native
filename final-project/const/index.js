const FILTERS = {
  sortBy: {
    title: "Sort By",
    values: {
      Distance: 0,
      Price: 1,
      Name: 2
    }
  },
  priceRange: {
    title: "Price",
    values: {
      Free: [0, 0],
      $: [1, 10],
      $$: [10, 20],
      $$$: [20, 100]
    }
  }
};

const DEFAULT_DELTAS = {
  latitudeDelta: 10,
  longitudeDelta: 40
};
const USA_DEFAULT_LOCATION = {
  latitude: 39.381266,
  longitude: -97.922211,
  latitudeDelta: 5,
  longitudeDelta: 40
};

const US_STATES = [
  {
    state: "Alaska",
    stateCode: "AK",
    latitude: 61.385,
    longitude: -152.2683
  },
  {
    state: "Alabama",
    stateCode: "AL",
    latitude: 32.799,
    longitude: -86.8073
  },
  {
    state: "Arkansas",
    stateCode: "AR",
    latitude: 34.9513,
    longitude: -92.3809
  },
  {
    state: "Arizona",
    stateCode: "AZ",
    latitude: 33.7712,
    longitude: -111.3877
  },
  {
    state: "California",
    stateCode: "CA",
    latitude: 36.17,
    longitude: -119.7462
  },
  {
    state: "Colorado",
    stateCode: "CO",
    latitude: 39.0646,
    longitude: -105.3272
  },
  {
    state: "Connecticut",
    stateCode: "CT",
    latitude: 41.5834,
    longitude: -72.7622
  },
  {
    state: "Delaware",
    stateCode: "DE",
    latitude: 39.3498,
    longitude: -75.5148
  },
  {
    state: "Florida",
    stateCode: "FL",
    latitude: 27.8333,
    longitude: -81.717
  },
  {
    state: "Georgia",
    stateCode: "GA",
    latitude: 32.9866,
    longitude: -83.6487
  },
  {
    state: "Hawaii",
    stateCode: "HI",
    latitude: 21.1098,
    longitude: -157.5311
  },
  {
    state: "Iowa",
    stateCode: "IA",
    latitude: 42.0046,
    longitude: -93.214
  },
  {
    state: "Idaho",
    stateCode: "ID",
    latitude: 44.2394,
    longitude: -114.5103
  },
  {
    state: "Illinois",
    stateCode: "IL",
    latitude: 40.3363,
    longitude: -89.0022
  },
  {
    state: "Indiana",
    stateCode: "IN",
    latitude: 39.8647,
    longitude: -86.2604
  },
  {
    state: "Kansas",
    stateCode: "KS",
    latitude: 38.5111,
    longitude: -96.8005
  },
  {
    state: "Kentucky",
    stateCode: "KY",
    latitude: 37.669,
    longitude: -84.6514
  },
  {
    state: "Louisiana",
    stateCode: "LA",
    latitude: 31.1801,
    longitude: -91.8749
  },
  {
    state: "Massachusetts",
    stateCode: "MA",
    latitude: 42.2373,
    longitude: -71.5314
  },
  {
    state: "Maryland",
    stateCode: "MD",
    latitude: 39.0724,
    longitude: -76.7902
  },
  {
    state: "Maine",
    stateCode: "ME",
    latitude: 44.6074,
    longitude: -69.3977
  },
  {
    state: "Michigan",
    stateCode: "MI",
    latitude: 43.3504,
    longitude: -84.5603
  },
  {
    state: "Minnesota",
    stateCode: "MN",
    latitude: 45.7326,
    longitude: -93.9196
  },
  {
    state: "Missouri",
    stateCode: "MO",
    latitude: 38.4623,
    longitude: -92.302
  },
  {
    state: "Mississippi",
    stateCode: "MS",
    latitude: 32.7673,
    longitude: -89.6812
  },
  {
    state: "Montana",
    stateCode: "MT",
    latitude: 46.9048,
    longitude: -110.3261
  },
  {
    state: "North Carolina",
    stateCode: "NC",
    latitude: 35.6411,
    longitude: -79.8431
  },
  {
    state: "North Dakota",
    stateCode: "ND",
    latitude: 47.5362,
    longitude: -99.793
  },
  {
    state: "Nebraska",
    stateCode: "NE",
    latitude: 41.1289,
    longitude: -98.2883
  },
  {
    state: "New Hampshire",
    stateCode: "NH",
    latitude: 43.4108,
    longitude: -71.5653
  },
  {
    state: "New Jersey",
    stateCode: "NJ",
    latitude: 40.314,
    longitude: -74.5089
  },
  {
    state: "New Mexico",
    stateCode: "NM",
    latitude: 34.8375,
    longitude: -106.2371
  },
  {
    state: "Nevada",
    stateCode: "NV",
    latitude: 38.4199,
    longitude: -117.1219
  },
  {
    state: "New York",
    stateCode: "NY",
    latitude: 42.1497,
    longitude: -74.9384
  },
  {
    state: "Ohio",
    stateCode: "OH",
    latitude: 40.3736,
    longitude: -82.7755
  },
  {
    state: "Oklahoma",
    stateCode: "OK",
    latitude: 35.5376,
    longitude: -96.9247
  },
  {
    state: "Oregon",
    stateCode: "OR",
    latitude: 44.5672,
    longitude: -122.1269
  },
  {
    state: "Pennsylvania",
    stateCode: "PA",
    latitude: 40.5773,
    longitude: -77.264
  },
  {
    state: "Rhode Island",
    stateCode: "RI",
    latitude: 41.6772,
    longitude: -71.5101
  },
  {
    state: "South Carolina",
    stateCode: "SC",
    latitude: 33.8191,
    longitude: -80.9066
  },
  {
    state: "South Dakota",
    stateCode: "SD",
    latitude: 44.2853,
    longitude: -99.4632
  },
  {
    state: "Tennessee",
    stateCode: "TN",
    latitude: 35.7449,
    longitude: -86.7489
  },
  {
    state: "Texas",
    stateCode: "TX",
    latitude: 31.106,
    longitude: -97.6475
  },
  {
    state: "Utah",
    stateCode: "UT",
    latitude: 40.1135,
    longitude: -111.8535
  },
  {
    state: "Virginia",
    stateCode: "VA",
    latitude: 37.768,
    longitude: -78.2057
  },
  {
    state: "Vermont",
    stateCode: "VT",
    latitude: 44.0407,
    longitude: -72.7093
  },
  {
    state: "Washington",
    stateCode: "WA",
    latitude: 47.3917,
    longitude: -121.5708
  },
  {
    state: "Wisconsin",
    stateCode: "WI",
    latitude: 44.2563,
    longitude: -89.6385
  },
  {
    state: "West Virginia",
    stateCode: "WV",
    latitude: 38.468,
    longitude: -80.9696
  },
  {
    state: "Wyoming",
    stateCode: "WY",
    latitude: 42.7475,
    longitude: -107.2085
  }
];

const MOCK_LOCATION = {
  latitude: 40.73061,
  longitude: -73.935242
};
export default {
  FILTERS,
  MOCK_LOCATION,
  US_STATES,
  USA_DEFAULT_LOCATION,
  DEFAULT_DELTAS
};
