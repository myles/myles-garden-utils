// Two decimal places is roughly 1 km of precision.
const COORDINATE_DECIMAL_PLACES = 2;

export const toDisplayCoordinates = (latitude: number, longitude: number): string => {
  const displayLatitude = formatCoordinate(latitude, "N", "S");
  const displayLongitude = formatCoordinate(longitude, "E", "W");

  return `${displayLatitude}, ${displayLongitude}`;
};

const formatCoordinate = (
  value: number,
  positiveHemisphere: string,
  negativeHemisphere: string,
): string => {
  // Pick the hemisphere from the rounded value, so -0.001 shows as
  // "0.00° N" rather than "0.00° S". Rounding yields -0, which is >= 0.
  const roundedValue = Number(value.toFixed(COORDINATE_DECIMAL_PLACES));
  const hemisphere = roundedValue >= 0 ? positiveHemisphere : negativeHemisphere;
  const degrees = Math.abs(roundedValue).toFixed(COORDINATE_DECIMAL_PLACES);

  return `${degrees}° ${hemisphere}`;
};

export default toDisplayCoordinates;
