import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QrCodeScanner() {
  const [scanResult, setScanResult] = useState(null);
  const scannerRef = useRef();

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

  return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="p-4 w-[500px]">
        <h2 className="text-xl font-bold mb-2">QR Code Scanner</h2>
        {scanResult ? (
          <div className="bg-green-100 p-2 rounded">
            <p>Scanned Result:</p>
            <p className="font-bold">{scanResult}</p>
          </div>
        ) : (
          <div id="qr-reader" ref={scannerRef} className="w-full"></div>
        )}
      </div>
    </div>
  );
}
