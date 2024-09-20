import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Box, Button, Fab, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '~/app/routes';
import { useBoolean } from '~/lib/hooks';
import { QRCodeViewer, ScanQrCodeDialog } from '.';

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppreciateComponent = ({ show, setShow }: Props) => {
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

  return show ? (
    <>
      <Stack
        p={2}
        width={1}
        position="fixed"
        justifyContent="space-between"
        alignItems="center"
        direction="row"
        sx={{
          zIndex: 100,
          bottom: 30,
          height: 80,
        }}
      >
        <Button
          sx={{
            alignSelf: 'flex-start',
            fontSize: 12,
            minWidth: 130,
          }}
          variant="contained"
          onClick={scannerDialog.setTrue}
        >
          Appreciate
        </Button>

        <Box
          sx={{
            position: 'relative',
            padding: 1.2,
            zIndex: 100,
            borderRadius: '50%',
          }}
        >
          <Fab
            onClick={() => {
              setShow(false);
            }}
          >
            <CloseOutlinedIcon />
          </Fab>
        </Box>

        <Button
          sx={{
            alignSelf: 'flex-start',
            fontSize: 12,
            minWidth: 130,
          }}
          variant="contained"
          onClick={() => {
            navigate(paths.qrOptions, {
              state: { isAdvanced: true },
            });
            setShow(false);
          }}
        >
          Get Appreciation
        </Button>
      </Stack>

      <ScanQrCodeDialog isOpen={scannerDialog.isTrue} onClose={scannerDialog.setFalse} />
      <QRCodeViewer backButton isOpen={viewQr.isTrue} onClose={viewQr.setFalse} />
    </>
  ) : (
    <></>
  );
};
