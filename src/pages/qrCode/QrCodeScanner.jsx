import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { checkStudentLocation } from "./distanceAndLocation";

export default function QrCodeScanner() {
  const [distanceData, setDistanceData] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [scanResult, setScanResult] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        setError(err.message);
      }
    );
  };

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scanner?.render(
      (decodedText) => {
        try {
          const code = JSON.parse(decodedText);
          setScanResult(code);
          scanner?.clear();
        } catch (error) {
          console.error("Error parsing QR code:", error);
        }
      },
      (errorMessage) => {
        console.warn(errorMessage);
      }
    );

    return () => {
      scanner?.clear();
      // scanner?.stop();
    };
  }, []);

  function handleLocation() {
    getLocation();
  }

  function handleDistance() {
    const studentLat = location?.lat;
    const studentLon = location?.lon;
    const schoolLat = Number(scanResult?.Latitude || scanResult?.[0]?.Latitude);
    const schoolLon = Number(
      scanResult?.Longitude || scanResult?.[0]?.Longitude
    );

    const data = checkStudentLocation(
      studentLat,
      studentLon,
      schoolLat,
      schoolLon
    );
    setDistanceData(data);
  }

  return (
    <>
      <div className="flex justify-center items-center h-[60vh] flex-col">
        <div className="p-4 w-[500px]">
          <h2 className="text-xl font-bold mb-2">QR Code Scanner</h2>
          {scanResult ? (
            <div className="bg-green-200 p-2 rounded">
              <p>Scanned Result:</p>
              <p className="font-bold">{JSON.stringify(scanResult)}</p>
            </div>
          ) : (
            <div id="qr-reader" className="w-full"></div>
          )}
        </div>

        <div onClick={handleLocation} className="mt-[50px] cursor-pointer">
          <h1 className="text-[30px] font-semibold border bg-gray-400 p-2 rounded-md">
            اوجد موقعك الجغرافي
          </h1>
          <div className="flex flex-col">
            <span className="text-red-500 font-semibold text-[20px]">
              Latitude: {location?.lat}
            </span>
            <span className="text-red-500 font-semibold text-[20px]">
              Longitude: {location?.lon}
            </span>
          </div>
          <div>
            <span className="text-red-500">{error}</span>
          </div>
        </div>

        <div onClick={handleDistance} className="mt-[50px] cursor-pointer">
          <h1 className="text-[30px] font-semibold border bg-green-400 p-2 rounded-md">
            اوجد المسافة
          </h1>
          <div className="flex flex-col">
            <span className="text-red-500 font-semibold text-[20px]">
              Result: {distanceData?.result}
            </span>
            <span className="text-red-500 font-semibold text-[20px]">
              Distance: {distanceData?.distance} meters
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
