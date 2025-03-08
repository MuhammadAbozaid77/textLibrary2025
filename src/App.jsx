import { checkStudentLocation } from "./pages/qrCode/distanceAndLocation";
import QrCodeScanner from "./pages/qrCode/QrCodeScanner";

export default function App() {
  const handeldistance = () => {
    //   const distance = getDistance(studentLat, studentLon, schoolLat, schoolLon);
    /*

Latitude: 30.031872
Longitude: 31.4343424
    */
    const data = checkStudentLocation("30.031872", "31.4343424");
    console.log("checkStudentLocation", data);
  };
  return (
    <div className="p-[50px]">
      {/* <Register /> */}
      {/* <Login /> */}
      <QrCodeScanner />

      {/* <CustomFo rm /> */}

      {/* <button onClick={() => handeldistance()}> Handel Distance </button> */}
    </div>
  );
}
