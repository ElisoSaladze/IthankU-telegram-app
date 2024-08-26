import { Avatar, Box, Button, Snackbar, Stack, Typography } from '@mui/material';
import BackButtonAppBar from 'src/components/appbar';
import IosShareIcon from '@mui/icons-material/IosShare';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { Params, useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getInvitationCode } from '~/api/groups';
import Loader from 'src/components/loader';
import { useState } from 'react';
import { handleShare } from 'src/helpers';
import { qk } from 'src/api/query-keys';

const InviteWithQr = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { groupId } = useParams<Params>();
  const location = useLocation();
  const { groupName, image, background } = location.state || {};

  const {
    data: invitationResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: qk.groups.getInvitationCode.toKeyWithArgs({ groupId: groupId! }),
    queryFn: () => getInvitationCode({ groupId: groupId! }),
    enabled: !!groupId,
  });

  const appreciationUrl = invitationResponse
    ? `https://web.itu-net.com/appreciate/${invitationResponse.data.inviteCode}`
    : '';

  const handleCopyLink = () => {
    const textToCopy = `Join our group "${groupName}" using this link: ${appreciationUrl}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setSnackbarOpen(true);
    });
  };

  return (
    <Stack height={'100vh'} overflow={'auto'}>
      <BackButtonAppBar pageName={'QR Code'} showNotif={false} />
      <Stack gap={2} marginTop={8} marginX={2}>
        <Stack
          maxHeight={'90%'}
          maxWidth={380}
          width={'100%'}
          paddingY={2}
          paddingX={1}
          borderRadius={10}
          alignItems={'center'}
          justifyContent={'center'}
          gap={1}
          boxShadow={'0px 0px 0px 1px #0000000F, 0px 10px 36px 0px #00000029'}
          position={'relative'}
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            width="100%"
            zIndex={1}
            bgcolor="#222222"
            height={100}
            sx={{
              backgroundImage: `url(${background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              overflow: 'hidden',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
          <Box bgcolor={'white'} p={1} borderRadius={'50%'} zIndex={2} mt={3}>
            <Avatar sx={{ height: 100, width: 100 }} src={image} />
          </Box>

          <Typography fontSize={24} fontWeight={600}>
            {groupName}
          </Typography>
          {isLoading || isFetching ? (
            <Loader />
          ) : (
            <img
              width={250}
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${appreciationUrl}&size=200x200`}
              alt="QR Code"
            />
          )}
        </Stack>
        <Stack gap={1} maxWidth={380} width={'100%'} direction={'row'}>
          <Button
            startIcon={<IosShareIcon />}
            size="large"
            fullWidth
            variant="contained"
            color="info"
            onClick={() => handleShare(appreciationUrl, 'Join our Group', 'Check out this link to join our group!')}
          >
            Share
          </Button>
          <Button startIcon={<InsertLinkIcon />} fullWidth size="large" variant="contained" onClick={handleCopyLink}>
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
};

export default InviteWithQr;
