import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import useHandelRealAttendance from "./useHandelRealAttendance";

export default function StudentQrCodeScanner() {
  const [scanResult, setScanResult] = useState("");

  const { attendanceStatus } = useHandelRealAttendance(scanResult);

  useEffect(() => {
    const readerElement = document.getElementById("reader");
    if (!readerElement) return;

    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: { width: 250, height: 250 },
      fps: 5,
    });

    const success = (result) => {
      scanner.clear();
      scanner.stop();
      setScanResult(result);
    };

    scanner.render(success, (err) => console.warn(err));

    return () => {
      scanner.clear();
      scanner.stop();
    };
  }, []);

  return (
    <div>
      <div className="mt-[50px] flex min-h-[500px] items-center justify-center border">
        <div className="w-[500px]">
          {scanResult ? (
            <div>Success: {scanResult}</div>
          ) : (
            <div id="reader"></div>
          )}
          <div className="mt-[50px] font-bold">
            data: attendanceStatus {attendanceStatus}
          </div>
        </div>
      </div>
    </div>
  );
}
