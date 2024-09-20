import { Avatar, Button, Dialog, Snackbar, Stack, Typography } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ShareIcon from '@mui/icons-material/Share';
import { useQuery } from '@tanstack/react-query';
import Loader from 'src/components/loader';
import { useState } from 'react';
import { handleShare } from 'src/helpers';
import { qk } from '~/api/query-keys';
import { getQRCode } from '~/api/appreciate';
import { useAuthUser } from '~/app/auth';
import { ErrorView } from '../error-view';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  shadeId?: string;
  shade?: string;
  hashtag?: string;
  backButton?: boolean;
};

export const QRCodeViewer = ({ shade, shadeId, hashtag, isOpen, onClose, backButton }: Props) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const authUser = useAuthUser();

  const {
    data: qrCode,
    isLoading,
    isError,
  } = useQuery({
    queryKey: qk.appreciate.getQRCode.toKeyWithArgs({ shadeId, hashtag }),
    queryFn: () => getQRCode({ shadeId, hashtag }),
  });

  const appreciationUrl = qrCode ? `https://web.itu-net.com/appreciate/${qrCode.data.requestId}` : '';

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
    return <ErrorView message="Error generating QR code." />;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const app = (window as any).Telegram!.WebApp;
  if (isOpen && backButton) {
    app.BackButton.show();
    app.BackButton.onClick(onClose);
  }

  return (
    <Dialog fullScreen open={isOpen} onClose={onClose}>
      <Stack justifyContent="space-between" height="100vh" p={3}>
        <Stack gap={1}>
          <Typography textAlign={'center'} variant="h6">
            One time Code: <span style={{ color: 'green' }}>{qrCode.data.requestId}</span>
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
            <Avatar sx={{ width: 85, height: 85 }} src={authUser?.user.picture} />
            <img
              width={260}
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${appreciationUrl}&size=200x200`}
              alt="QR Code"
            />
          </Stack>

          {shade && (
            <Typography>
              Shade: <span style={{ color: 'orange' }}>{shade}</span>
            </Typography>
          )}

          {hashtag && (
            <Typography>
              Hashtags: <span>{hashtag}</span>
            </Typography>
          )}

          <Stack direction="row" gap={1} mb={3}>
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
    </Dialog>
  );
};
