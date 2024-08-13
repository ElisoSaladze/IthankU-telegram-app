import { Stack, Typography } from "@mui/material";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";

const ScanQrCodePage = () => {
  const [data, setData] = useState("");
  const handleScan = (result: string | null) => {
    if (result) {
      setData(result);
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
