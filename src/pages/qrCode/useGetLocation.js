// import { useState } from "react";

// export default function useGetLocation() {
//   const [location, setLocation] = useState(null);
//   const [error, setError] = useState(null);

//   const getLocation = () => {
//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setLocation({
//           lat: position.coords.latitude,
//           lon: position.coords.longitude,
//         });
//       },
//       (err) => {
//         setError(err.message);
//       }
//     );
//   };

//   return { location, getLocation, error };
// }

import { useState, useEffect } from "react";

export default function useGetLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        setError(err.message);
      },
      {
        enableHighAccuracy: true, // More precise but uses more battery
        timeout: 10000, // Wait up to 10 seconds for a response
        maximumAge: 5000, // Use a cached location if it's not older than 5 seconds
      }
    );

    return () => navigator.geolocation.clearWatch(watchId); // Cleanup on unmount
  }, []);

  return { location, error };
}
