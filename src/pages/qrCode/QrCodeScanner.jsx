import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { checkStudentLocation } from "./distanceAndLocation";

export default function QrCodeScanner() {
  const [distanceData, setDistanceData] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const scannerRef = useRef();

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
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false
    );

    scanner.render(
      (decodedText) => {
        setScanResult(decodedText);
        scanner.clear();
      },
      (errorMessage) => {
        console.warn(errorMessage);
      }
    );

    return () => {
      scanner.clear();
    };
  }, []);

  //----------------handelLocation-----------------------
  function handelLocation() {
    getLocation();
  }

  //----------------handelDistance-----------------------
  function handelDistance() {
    // console.log(checkStudentLocation(studentLat, studentLon, schoolLat, schoolLon));
    const studentLat = location?.lat; // Example student's latitude
    const studentLon = location?.lon; // Example student's longitude
    const schoolLat = Number(scanResult?.[0]?.Latitude); // Example student's longitude
    const schoolLon = Number(scanResult?.[0]?.Longitude); // Example student's longitude

    const data = checkStudentLocation(
      studentLat,
      studentLon,
      schoolLat,
      schoolLon
    );
    setDistanceData(data);
  }
  return (
    <div className="flex justify-center items-center h-[60vh] flex-col">
      <div className="p-4 w-[500px]">
        <h2 className="text-xl font-bold mb-2">QR Code Scanner</h2>
        {scanResult ? (
          <div className="bg-green-200 p-2 rounded">
            <p>Scanned Result:</p>
            <p className="font-bold">
              {"scanResult?.[0]"} : {scanResult}
            </p>
            <p>Scanned LongTitude : {scanResult?.Longitude}</p>
            <p>Scanned Latitude : {scanResult?.Latitude}</p>
          </div>
        ) : (
          <div id="qr-reader" ref={scannerRef} className="w-full"></div>
        )}
      </div>

      {/* --------------------------- Handel Location ---------------------------*/}
      <div onClick={() => handelLocation()} className="mt-[50px]">
        <h1 className="text-[30px] font-semibold border bg-gray-400 p-2 rounded-md cursor-pointer ">
          اوجد موقعك الجغرافي
        </h1>

        <div className="flex justify-start  flex-col">
          <span className="text-red-500 font-semibold text-[20px]">
            latitude : {location?.lat}
          </span>
          <span className="text-red-500 font-semibold text-[20px]">
            longitude :{location?.lon}
          </span>
        </div>
        <div>
          <span> {error} </span>
        </div>
      </div>

      {/* --------------------------- Handel Distance ---------------------------*/}
      <div onClick={() => handelDistance()} className="mt-[50px]">
        <h1 className="text-[30px] font-semibold border bg-green-400 p-2 rounded-md cursor-pointer ">
          اوجد المسافة
        </h1>
        <div className="flex justify-start  flex-col">
          <span className="text-red-500 font-semibold text-[20px]">
            Result : {distanceData?.result}
          </span>
          <span className="text-red-500 font-semibold text-[20px]">
            distance : {distanceData?.distance}
          </span>
        </div>
      </div>
    </div>
  );
}
