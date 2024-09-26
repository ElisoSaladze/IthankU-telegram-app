import { Avatar, Box, Button, Snackbar, Stack, Typography } from '@mui/material';
import IosShareIcon from '@mui/icons-material/IosShare';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { generatePath, Params, useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getInvitationCode } from '~/api/spaces';
import { useState } from 'react';
import { handleShare } from 'src/helpers';
import { qk } from 'src/api/query-keys';
import { AppHeader } from '~/components/header';
import { paths } from '~/app/routes';
import { Progress } from '~/components/progress';
import copy from 'copy-text-to-clipboard';

export const InviteWithQr = () => {
  const location = useLocation();

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { spaceId } = useParams<Params>();
  const { spaceName, image, background } = location.state || {};

  const {
    data: invitationResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: qk.spaces.getInvitationCode.toKeyWithArgs({ spaceId: spaceId! }),
    queryFn: () => getInvitationCode({ spaceId: spaceId! }),
    enabled: !!spaceId,
  });

  const handleCopyLink = () => {
    const textToCopy = `Join our space "${spaceName}" using this link: ${invitationResponse?.data.telegramUrl}`;
    copy(textToCopy);
  };

  return (
    <Box position="relative">
      <AppHeader
        backPath={generatePath(paths.spaceDetails, {
          spaceId: spaceId!,
        })}
        pageName="QR Code"
        headerSx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      />
      <Box
        sx={{
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Stack
          width={1}
          py={2}
          px={1}
          borderRadius={9}
          alignItems="center"
          justifyContent="center"
          gap={1}
          boxShadow="0px 0px 0px 1px #0000000F, 0px 10px 36px 0px #00000029"
          position="relative"
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 1,
              zIndex: 1,
              bgcolor: '#222222',
              height: 120,
              backgroundImage: `url(${background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              overflow: 'hidden',
              borderTopLeftRadius: 36,
              borderTopRightRadius: 36,
            }}
          />
          <Box bgcolor="white" p={1} borderRadius="50%" zIndex={2} mt={3}>
            <Avatar sx={{ height: 100, width: 100 }} src={image} />
          </Box>

          <Typography fontSize={24} fontWeight={600}>
            {spaceName}
          </Typography>

          <Box sx={{ height: 250, position: 'relative' }}>
            {isLoading || isFetching ? (
              <Progress centered />
            ) : (
              <Box component="img" height={1} src={invitationResponse?.data.qrCode} alt="QR Code" />
            )}
          </Box>

          <Typography fontSize={15} textAlign="center">
            Scan the QR code to join the space
          </Typography>
        </Stack>

        <Box sx={{ width: 1, display: 'flex', gap: 1, mt: 3 }}>
          <Button
            startIcon={<IosShareIcon />}
            size="large"
            fullWidth
            variant="contained"
            color="info"
            onClick={() => {
              if (invitationResponse) {
                handleShare(
                  invitationResponse.data.telegramUrl,
                  'Join our Space',
                  'Check out this link to join our space!',
                );
              }
            }}
          >
            Share
          </Button>
          <Button startIcon={<InsertLinkIcon />} fullWidth size="large" variant="contained" onClick={handleCopyLink}>
            Copy
          </Button>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
          message="Link copied to clipboard!"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </Box>
    </Box>
  );
};
