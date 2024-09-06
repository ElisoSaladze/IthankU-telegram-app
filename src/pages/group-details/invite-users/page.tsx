import { AppBar, Avatar, Box, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ControlledTextField } from 'src/components/form/controlled/controlled-text-field';
import SearchIcon from '@mui/icons-material/Search';
import { Params, useNavigate, useParams } from 'react-router-dom';
import IosShareIcon from '@mui/icons-material/IosShare';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getInvitationCode, getUsersToInvite, inviteUser } from '~/api/groups';
import { handleShare } from 'src/helpers';
import { qk } from 'src/api/query-keys';

export const InviteUserPage = () => {
  const { groupId } = useParams<Params>();
  const navigate = useNavigate();
  const { control, watch } = useForm({
    defaultValues: {
      name: '',
    },
  });

  const { data: invitationResponse } = useQuery({
    queryKey: qk.groups.getInvitationCode.toKeyWithArgs({ groupId: groupId! }),
    queryFn: () => getInvitationCode({ groupId: groupId! }),
    enabled: !!groupId,
  });

  const searchTerm = watch('name').toLowerCase();

  const { data: usersResponse } = useQuery({
    queryKey: qk.groups.getUserToInvite.toKeyWithArgs({ groupId: groupId! }),
    queryFn: () => getUsersToInvite({ groupId: groupId! }),
    enabled: !!groupId,
  });

  const filteredUsers = usersResponse?.data.filter((user) => user.name.toLowerCase().includes(searchTerm));

  const $inviteUser = useMutation({
    mutationFn: inviteUser,
  });

  return (
    <Stack overflow={'hidden'} justifyContent={'space-between'} height={'100vh'}>
      <Stack paddingBottom={2} gap={1} bgcolor={'#21A54D'} color={'white'} textAlign={'center'}>
        <AppBar
          sx={{
            backgroundColor: 'transparent',
          }}
        >
          <Toolbar>
            <ArrowBackIosIcon onClick={() => navigate(-1)} sx={{ color: 'white' }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                marginX={2}
                fontWeight={500}
                variant="h6"
                component="div"
                sx={{ textAlign: 'center', fontSize: 16 }}
              >
                Expand Our Community!
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <Typography fontSize={12}>
          Help grow our group by inviting others. Use the search field below to find and invite new members or share the
          link.
        </Typography>
        <Stack marginX={2} justifyContent={'center'} gap={1} direction={'row'}>
          <ControlledTextField
            InputProps={{
              sx: {
                height: '100%',
                borderRadius: 2,
                backgroundColor: 'white',
                '& fieldset': {
                  border: 'none',
                  height: '100%',
                },
              },
            }}
            fullWidth
            control={control}
            name="name"
          />
          <IconButton
            sx={{
              backgroundColor: 'white',
              borderRadius: 2,
              height: 40,
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
            }}
          >
            <SearchIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Stack marginTop={1} paddingX={2} gap={1} paddingBottom={10} overflow={'auto'} height={'100%'}>
        {filteredUsers?.map((user) => (
          <Box
            onClick={() => {
              $inviteUser.mutate({
                groupId: groupId!,
                inviteeId: user.id,
              });
            }}
            key={user.id}
          >
            <Stack
              borderRadius={2}
              padding={1}
              boxShadow={'0px 3px 10.4px -2px #00000026'}
              width={'100%'}
              justifyContent={'space-between'}
              alignItems={'center'}
              direction={'row'}
            >
              <Stack gap={1} alignItems={'center'} direction={'row'}>
                <Avatar src={user.picture} />
                <Typography>{user.name}</Typography>
              </Stack>
              {/* {isLoading ? (
                  <CircularProgress />
                ) : isSuccess ? (
                  <Typography color={"primary"}>invited</Typography>
                ) : (
                  <Button variant="outlined">Invite</Button>
                )} */}
              <Button variant="outlined">Invite</Button>
            </Stack>
          </Box>
        ))}
      </Stack>
      <Button
        onClick={() => {
          if (invitationResponse) {
            handleShare(
              invitationResponse.data.telegramUrl,
              'Join our Group',
              'Check out this link to join our group!',
            );
          }
        }}
        sx={{
          marginX: 2,
          position: 'fixed',
          bottom: 8,
          left: 0,
          right: 0,
        }}
        variant="contained"
        size="large"
        startIcon={<IosShareIcon />}
      >
        Share
      </Button>
    </Stack>
  );
};
