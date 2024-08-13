import { Stack, Typography } from "@mui/material";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ScanQrCodePage = () => {
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const handleScan = (result: string | null) => {
    if (result) {
      setData(result);
      const url = new URL(result);
      if (
        url.hostname === "web.itu-net.com" &&
        url.pathname.startsWith("/appreciate/")
      ) {
        const appreciateId = url.pathname.split("/").pop();
        if (appreciateId) {
          navigate(`/appreciate/${appreciateId}`);
        } else {
          console.error("Invalid QR code");
        }
      }
    }
  };

  return (
    <Stack>
      <Typography>Scan QR Code</Typography>
      <Scanner onScan={(result) => handleScan(result[0].rawValue)} />
      <Typography>{data}</Typography>
    </Stack>
  );
};

export default ScanQrCodePage;
