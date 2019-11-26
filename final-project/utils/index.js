import constants from "../const";

export function extractCoordinates(coords) {
  const latitude = Number(
    coords.slice(coords.indexOf(":") + 1, coords.indexOf(","))
  );
  const longitude = Number(coords.slice(coords.lastIndexOf(":") + 1));
  return {
    latitude,
    longitude
  };
}

Number.prototype.toRad = function() {
  return (this * Math.PI) / 180;
};

export function distanceFromLocation(fromCoords, toCoords, inMiles = true) {
  const { latitude: lat1, longitude: lon1 } = fromCoords;
  const { latitude: lat2, longitude: lon2 } = toCoords;

  const R = 6371; // km
  const φ1 = lat1.toRad();
  const φ2 = lat2.toRad();
  const Δφ = (lat2 - lat1).toRad();
  const Δλ = (lon2 - lon1).toRad();

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  let distance = R * c;
  return inMiles ? (distance /= 1.60934) : distance;
}

export function extractEntranceFees(entranceFees) {
  if (!entranceFees.length) return [0, 0];

  const fees = entranceFees.map(fee => +fee.cost);
  const minFee = Math.min(...fees);
  const maxFee = Math.max(...fees);

  return [minFee, maxFee];
}
export function renderEntranceFees(feesRange) {
  const minFee = feesRange[0];
  const maxFee = feesRange[1];

  if (minFee === maxFee && minFee === 0) return "Free";

  return minFee === maxFee
    ? `${minFee.toFixed(2)}$`
    : `${minFee.toFixed(2)}-${maxFee.toFixed(2)}$`;
}

export function isInRange(range1, range2) {
  const [min, max] = range1;
  const [min1, max1] = range2;

  return min >= min1 && max <= max1;
}

export function getStateFromCode(stateCode) {
  const state = constants.US_STATES.find(
    state => state.stateCode === stateCode
  );

  return state;
}
