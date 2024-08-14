import { useLocation } from "react-router-dom";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ShareIcon from "@mui/icons-material/Share";
import { useQuery } from "@tanstack/react-query";
import { getQRCode } from "src/api/appreciate/api";
import BackButtonAppBar from "src/components/appbar";
import { useAuthContext } from "src/providers/auth";

function QRCodePage() {
  const { userData } = useAuthContext();
  const location = useLocation();
  const { area, hashtag } = location.state || {};

  const {
    data: qrCode,
    isLoading,
    isError,
  } = useQuery(["getQRCode", { area, hashtag }], () =>
    getQRCode({ area, hashtag })
  );

  const appreciationUrl = qrCode
    ? `https://web.itu-net.com/appreciate/${qrCode.data}`
    : "";

  const handleShare = () => {
    alert("Share functionality here");
  };

  const handleCopy = () => {
    if (qrCode) {
      navigator.clipboard.writeText(appreciationUrl);
    }
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError || !qrCode) {
    return <Typography>Error generating QR code.</Typography>;
  }

  return (
    <Stack justifyContent={"space-between"} height={"100vh"} padding={2}>
      <BackButtonAppBar pageName="" />
      <Typography variant="h6">
        One time Code: <span style={{ color: "green" }}>{qrCode.data}</span>
      </Typography>
      <Stack
        gap={2}
        alignItems={"center"}
        justifyContent={"center"}
        border={"2px solid #21954D"}
        borderRadius={4}
        paddingY={2}
        marginTop={2}
      >
        <Avatar
          sx={{ width: 85, height: 85 }}
          src={userData.data?.user.picture}
        />
        <img
          width={260}
          src={`https://api.qrserver.com/v1/create-qr-code/?data=${appreciationUrl}&size=200x200`}
          alt="QR Code"
        />
      </Stack>

      {area && (
        <Typography>
          Area: <span style={{ color: "orange" }}>{area}</span>
        </Typography>
      )}
      {hashtag && (
        <Typography>
          Hashtags: <span>{hashtag}</span>
        </Typography>
      )}
      <Stack direction={"row"} gap={1}>
        <Button
          size="medium"
          fullWidth
          variant="contained"
          startIcon={<ShareIcon />}
          onClick={handleShare}
        >
          Share
        </Button>
        <Button
          size="medium"
          fullWidth
          variant="outlined"
          startIcon={<FileCopyIcon />}
          onClick={handleCopy}
        >
          Copy
        </Button>
      </Stack>
    </Stack>
  );
}

export default QRCodePage;
