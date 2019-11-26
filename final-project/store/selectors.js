import { createSelector } from "reselect";
import constants from "../const";
import {
  extractCoordinates,
  distanceFromLocation,
  extractEntranceFees,
  isInRange
} from "../utils";

const getParksFromState = state => state.parks;
const getSettings = state => state.settings;
const getUserLocationFromState = state => state.userLocation;

export const getParks = createSelector(
  [getParksFromState, getUserLocationFromState],
  (parks, userLocation) => {
    return parks.map(park => {
      const latLongObject = extractCoordinates(park.latLong);
      return {
        ...park,
        latLongObject,
        entranceFeesRange: extractEntranceFees(park.entranceFees),
        distanceFromUserLocation: distanceFromLocation(
          latLongObject,
          userLocation
        )
      };
    });
  }
);

export const filterParks = createSelector(
  [getParks, getSettings],
  (parks, settings) => {
    switch (settings.priceRange) {
      case constants.FILTERS.priceRange.values.Free:
        return parks.filter(park =>
          isInRange(
            park.entranceFeesRange,
            constants.FILTERS.priceRange.values.Free
          )
        );
      case constants.FILTERS.priceRange.values.$:
        return parks.filter(park =>
          isInRange(
            park.entranceFeesRange,
            constants.FILTERS.priceRange.values.$
          )
        );
      case constants.FILTERS.priceRange.values.$$:
        return parks.filter(park =>
          isInRange(
            park.entranceFeesRange,
            constants.FILTERS.priceRange.values.$$
          )
        );
      case constants.FILTERS.priceRange.values.$$$:
        return parks.filter(park =>
          isInRange(
            park.entranceFeesRange,
            constants.FILTERS.priceRange.values.$$$
          )
        );
      default:
        return parks;
    }
  }
);

export const sortParks = createSelector(
  [filterParks, getSettings],
  (parks, settings) => {
    switch (settings.sortBy) {
      case constants.FILTERS.sortBy.values.Distance:
        return [...parks].sort(
          (a, b) => a.distanceFromUserLocation - b.distanceFromUserLocation
        );
      case constants.FILTERS.sortBy.values.Price:
        return [...parks].sort(
          (a, b) => a.entranceFeesRange[0] > b.entranceFeesRange[0]
        );
      case constants.FILTERS.sortBy.values.Name:
        return [...parks].sort(
          (a, b) => a.name.toLowerCase() > b.name.toLowerCase()
        );
      default:
        return parks;
    }
  }
);

export const getParksComputed = createSelector([sortParks], parks => {
  return parks;
});
