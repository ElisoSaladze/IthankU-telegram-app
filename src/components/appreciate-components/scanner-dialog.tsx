import { Box, Dialog, Stack, Typography } from '@mui/material';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useNavigate } from 'react-router-dom';
import background from 'src/assets/images/scanner-back.png';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ScanQrCodeDialog = ({ isOpen, onClose }: Props) => {
  const navigate = useNavigate();
  const handleScan = (result: string | null) => {
    if (result) {
      const url = new URL(result);
      if (url.hostname === 'web.itu-net.com' && url.pathname.startsWith('/appreciate/')) {
        const appreciateId = url.pathname.split('/').pop();
        if (appreciateId) {
          navigate(`/appreciate/${appreciateId}`);
          onClose();
        } else {
          console.error('Invalid QR code');
        }
      }
    }
  };

  return (
    <Dialog fullScreen open={isOpen} onClose={onClose}>
      <Stack>
        <Stack alignItems="center" justifyContent="center" gap={4} mx={2}>
          <Stack
            width="100%"
            borderRadius={4}
            alignItems="center"
            p={1}
            sx={{
              backgroundImage: `url(${background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <Typography fontSize={32}>
              Scan{' '}
              <Typography fontSize={32} component="span" color="primary">
                QR Code
              </Typography>
            </Typography>
            <Typography>Place QR inside the frame to scan</Typography>
          </Stack>
          <Box position="relative" width={300} height={300}>
            <Scanner
              onScan={(result) => {
                handleScan(result[0]!.rawValue);
              }} // TODO
              components={{
                audio: false,
                finder: false,
                torch: false,
              }}
              styles={{
                container: {
                  width: '100%',
                  height: '100%',
                },
              }}
            />

            <Box position="absolute" top={0} left={0} right={0} bottom={0}>
              <Box
                position="absolute"
                top={0}
                left={0}
                width={50}
                height={50}
                borderTop="4px solid #21954D"
                borderLeft="4px solid #21954D"
              />
              <Box
                position="absolute"
                top={0}
                right={0}
                width={50}
                height={50}
                borderTop="4px solid #21954D"
                borderRight="4px solid #21954D"
              />
              <Box
                position="absolute"
                bottom={0}
                left={0}
                width={50}
                height={50}
                borderBottom="4px solid #21954D"
                borderLeft="4px solid #21954D"
              />
              <Box
                position="absolute"
                bottom={0}
                right={0}
                width={50}
                height={50}
                borderBottom="4px solid #21954D"
                borderRight="4px solid #21954D"
              />
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Dialog>
  );
};
