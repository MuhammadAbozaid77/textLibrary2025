import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import useHandelRealAttendance from "./useHandelRealAttendance";

export default function StudentQrCodeScanner() {
  const [scanResult, setScanResult] = useState("");
  const { attendanceStatus } = useHandelRealAttendance(scanResult);

  useEffect(() => {
    if (scanResult) return; // Stop re-initializing if scan is already done

    const readerElement = document.getElementById("reader");
    if (!readerElement) return;

    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: { width: 250, height: 250 },
      fps: 5,
    });

    const success = (result) => {
      setScanResult(result);
      scanner.clear();
      scanner.stop();
    };

    scanner.render(success, (err) => console.warn(err));

    return () => {
      scanner.clear();
      scanner.stop();
    };
  }, [scanResult]);

  return (
    <div>
      <div className="mt-[50px] flex min-h-[500px] items-center justify-center border">
        <div className="w-[500px]">
          {scanResult ? (
            <div>
              <p className="text-green-600 font-bold">Success: {scanResult}</p>
              <button
                className="mt-4 p-2 bg-blue-500 text-white rounded"
                onClick={() => setScanResult("")}
              >
                Scan Again
              </button>
            </div>
          ) : (
            <div id="reader"></div>
          )}
          <div className="mt-[50px] font-bold">
            Data: Attendance Status - {attendanceStatus}
          </div>
        </div>
      </div>
    </div>
  );
}
