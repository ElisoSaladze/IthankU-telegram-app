import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Box, Button, Fab, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '~/app/routes';
import { useBoolean } from '~/lib/hooks';
import { QRCodeViewer, ScanQrCodeDialog } from '.';

type Props = {
  show: boolean;
  onHide: () => void;
};

export const AppreciateComponent = ({ show, onHide }: Props) => {
  const navigate = useNavigate();

  const scannerDialog = useBoolean();
  const viewQr = useBoolean();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const app = (window as any).Telegram!.WebApp;
    if (scannerDialog.isTrue) {
      app.BackButton.show();
      app.BackButton.onClick(scannerDialog.setFalse);
    } else {
      app.BackButton.hide();
    }
  }, [scannerDialog.isTrue, scannerDialog.setFalse]);

  return (
    <Box>
      {show && (
        <Stack
          p={2}
          width={1}
          position="fixed"
          justifyContent="space-between"
          alignItems="center"
          direction="row"
          sx={{
            zIndex: 9999,
            bottom: 55,
            height: 80,
          }}
        >
          <Button
            sx={{
              alignSelf: 'flex-start',
              fontWeight: 600,
              fontSize: 12,
              width: 1,
              mr: 3,
            }}
            size="large"
            variant="contained"
            onClick={() => {
              scannerDialog.setTrue();
              onHide();
            }}
          >
            Appreciate
          </Button>

          <Box
            sx={{
              position: 'relative',
              zIndex: 100,
              borderRadius: '50%',
            }}
          >
            <Fab onClick={onHide}>
              <CloseOutlinedIcon />
            </Fab>
          </Box>

          <Button
            sx={{
              alignSelf: 'flex-start',
              fontSize: 12,
              fontWeight: 600,
              width: 1,
              ml: 3,
            }}
            variant="contained"
            size="large"
            onClick={() => {
              navigate(paths.qrOptions, {
                state: { isAdvanced: true },
              });
              onHide();
            }}
          >
            Get Appreciation
          </Button>
        </Stack>
      )}

      <ScanQrCodeDialog isOpen={scannerDialog.isTrue} onClose={scannerDialog.setFalse} />
      {viewQr.isTrue && <QRCodeViewer backButton onClose={viewQr.setFalse} />}
    </Box>
  );
};
