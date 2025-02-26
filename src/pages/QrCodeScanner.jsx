import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

export default function QrCodeScanner() {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    const success = (result) => {
      scanner.clear();
      setScanResult(result);
    };

    const error = (err) => {
      console.warn(err);
    };
    scanner.render(success, error);
  }, []);

  return (
    <div>
      <h1>QrCodeScanner</h1>
      <div className="mt-[50px] border min-h-[500px] flex justify-center items-center">
        <div className="w-[500px]">
          {scanResult ? (
            <div>
              Muhammad : Success :{" "}
              <a href={"http://" + scanResult}>{scanResult}</a>
            </div>
          ) : (
            <div id="reader"></div>
          )}
        </div>
      </div>
    </div>
  );
}
