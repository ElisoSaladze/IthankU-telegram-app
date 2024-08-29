import { useLocation } from 'react-router-dom';
import { Avatar, Box, Button, Snackbar, Stack, Typography } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ShareIcon from '@mui/icons-material/Share';
import { useQuery } from '@tanstack/react-query';
import BackButtonAppBar from 'src/components/appbar';
import { useAuthContext } from 'src/providers/auth';
import Loader from 'src/components/loader';
import back from 'src/assets/images/itu.png';
import { useState } from 'react';
import { handleShare } from 'src/helpers';
import { qk } from '~/api/query-keys';
import { getQRCode } from '~/api/appreciate';

function QRCodePage() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { userData } = useAuthContext();
  const location = useLocation();

  const { area, hashtag } = location.state || {};

  const {
    data: qrCode,
    isLoading,
    isError,
  } = useQuery({
    queryKey: qk.appreciate.getQRCode.toKeyWithArgs({ area, hashtag }),
    queryFn: () => getQRCode({ area, hashtag }),
  });

  const appreciationUrl = qrCode ? `https://web.itu-net.com/appreciate/${qrCode.data}` : '';

  const handleCopy = () => {
    const textToCopy = `Thank me by QR: ${appreciationUrl}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setSnackbarOpen(true);
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !qrCode) {
    return <Typography>Error generating QR code.</Typography>;
  }

  return (
    <Stack justifyContent="space-between" height="100vh">
      <BackButtonAppBar pageName="" color="transparent" />
      <Box
        sx={{
          width: '100%',
          height: 175,
          backgroundImage: `url(${back})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <Stack gap={1} p={2}>
        <Typography textAlign={'center'} variant="h6">
          One time Code: <span style={{ color: 'green' }}>{qrCode.data}</span>
        </Typography>
        <Stack
          gap={2}
          alignItems="center"
          justifyContent="center"
          border="2px solid #21954D"
          borderRadius={4}
          py={2}
          mt={2}
        >
          <Avatar sx={{ width: 85, height: 85 }} src={userData.data?.user.picture} />
          <img
            width={260}
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${appreciationUrl}&size=200x200`}
            alt="QR Code"
          />
        </Stack>

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
        <Stack direction="row" gap={1}>
          <Button
            size="medium"
            fullWidth
            variant="contained"
            startIcon={<ShareIcon />}
            onClick={() => handleShare(appreciationUrl, 'Thank me by QR', '')}
          >
            Share
          </Button>
          <Button size="medium" fullWidth variant="outlined" startIcon={<FileCopyIcon />} onClick={handleCopy}>
            Copy
          </Button>
        </Stack>
      </Stack>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Link copied to clipboard!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Stack>
  );
}

export default QRCodePage;
