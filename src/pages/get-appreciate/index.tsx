import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ShareIcon from '@mui/icons-material/Share';
import { useQuery } from '@tanstack/react-query';
import { getQRCode } from 'src/api/appreciate/api';

function QRCodePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { area, hashtag } = location.state || {};

  const { data: qrCode, isLoading, isError } = useQuery(
    ['getQRCode', { area, hashtag }],
    () => getQRCode({ area, hashtag }),
  );

  const appreciationUrl = qrCode ? `https://web.itu-net.com/appreciate/${qrCode.data}` : '';

  const handleShare = () => {
    alert('Share functionality here');
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
    <Box sx={{ padding: 3, border: '1px solid #ccc', borderRadius: 2, textAlign: 'center', marginTop: 5 }}>
      <Typography variant="h6">
        One time Code: <span style={{ color: 'green' }}>{qrCode.data}</span>
      </Typography>
      <Box sx={{ marginY: 2 }}>
        <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${appreciationUrl}&size=200x200`} alt="QR Code" />
      </Box>
      {area && (
        <Typography>
          Area: <span style={{ color: 'orange' }}>{area}</span>
        </Typography>
      )}
      {hashtag && (
        <Typography>
          Hashtags: <span>{hashtag}</span>
        </Typography>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        <Button variant="contained" startIcon={<ShareIcon />} onClick={handleShare}>
          Share
        </Button>
        <Button variant="outlined" startIcon={<FileCopyIcon />} onClick={handleCopy}>
          Copy
        </Button>
      </Box>
      <Box sx={{ marginTop: 2, textAlign: 'center' }}>
        <Button variant="text" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Box>
    </Box>
  );
}

export default QRCodePage;
