const calculateSum = (previous, current) => [previous[0] + current[0], previous[1] + current[1]]
export const centroid = latLonArray => latLonArray
  .reduce(calculateSum, [0, 0])
  .map(latLonSum => latLonSum / latLonArray.length)
