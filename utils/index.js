

const convertCoordinates = (coordinates, period) => {
  // Inverts the plot points on both axes to have all of Home teams shots on lefts side and all Away teams shots on right side.
  if (period === 2) {
      coordinates.x = coordinates.x * -1
      coordinates.y = coordinates.y * -1
  }
  // Shifts coordinates fro use in D3 which moves to the righ and down, positively starting at zero
  coordinates.x = coordinates.x + 99
  coordinates.y = (coordinates.y * -1) + 42
  return coordinates
}

module.exports = convertCoordinates;