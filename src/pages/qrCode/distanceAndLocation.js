function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Radius of the Earth in meters
  const toRad = (angle) => (angle * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

export function checkStudentLocation(
  studentLat,
  studentLon,
  schoolLat,
  schoolLon
) {
  const distance = getDistance(studentLat, studentLon, schoolLat, schoolLon);

  if (distance > 50) {
    return {
      result: "Student NOT in location.",
      distance: distance.toFixed(2),
    };
  } else {
    return {
      result: "Student IN location. Distance:",
      distance: distance.toFixed(2),
    };
  }
}

// // Example usage:
// const studentLat = 30.0444; // Example student's latitude
// const studentLon = 31.2357; // Example student's longitude
// const schoolLat = 30.044; // Example school's latitude
// const schoolLon = 31.236; // Example school's longitude

// console.log(checkStudentLocation(studentLat, studentLon, schoolLat, schoolLon));
