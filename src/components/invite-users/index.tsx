import { AppBar, Avatar, Box, Button, Dialog, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { match, P } from 'ts-pattern';
import { handleShare } from 'src/helpers';
import { getInvitationCode, getUsersToInvite, inviteUser } from '~/api/groups';
import { qk } from '~/api/query-keys';
import { ControlledTextField } from '../form/controlled/controlled-text-field';
import IosShareIcon from '@mui/icons-material/IosShare';
import SearchIcon from '@mui/icons-material/Search';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
};

const IntivationDialog = ({ isOpen, onClose, groupId }: Props) => {
  const [ref, inView] = useInView();
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

  const $inviteUsers = useInfiniteQuery({
    queryKey: qk.groups.getUserToInvite.toKeyWithArgs({ groupId }),
    queryFn: async ({ pageParam = 1 }) => getUsersToInvite({ groupId, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.meta.page + 1;
      return nextPage <= lastPage.meta.totalPages ? nextPage : undefined;
    },
  });

  const searchTerm = watch('name').toLowerCase();

  const filteredUsers = match($inviteUsers)
    .with({ isLoading: true }, () => [])
    .with({ isSuccess: true, data: P.select() }, ({ pages }) => {
      const allUsers = pages.flatMap((page) => page.data);
      return allUsers.filter((user) => user.name.toLowerCase().includes(searchTerm));
    })
    .run();

  const appreciationUrl = invitationResponse
    ? `https://web.itu-net.com/appreciate/${invitationResponse.data.qrCode}`
    : '';

  const $inviteUser = useMutation({
    mutationFn: inviteUser,
    onSuccess: () => $inviteUsers.refetch(),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const app = (window as any).Telegram!.WebApp;
  if (isOpen) {
    app.BackButton.show();
    app.BackButton.onClick(() => onClose());
  } else {
    app.BackButton.hide();
  }

  useEffect(() => {
    if (inView && $inviteUsers.hasNextPage) {
      $inviteUsers.fetchNextPage();
    }
  }, [$inviteUsers, inView]);

  return (
    <Dialog fullScreen open={isOpen} onClose={onClose}>
      <Stack overflow={'hidden'} justifyContent={'space-between'} height={'100vh'}>
        <Stack paddingBottom={2} gap={1} bgcolor={'#21A54D'} color={'white'} textAlign={'center'}>
          <AppBar sx={{ backgroundColor: 'transparent' }}>
            <Toolbar>
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
            Help grow our group by inviting others. Use the search field below to find and invite new members or share
            the link.
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
            <Box key={user.id}>
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
                {user.status === 'PENDING' ? (
                  <DoneOutlinedIcon color="primary" />
                ) : (
                  <Button
                    onClick={() => {
                      $inviteUser.mutate({
                        groupId: groupId!,
                        inviteeId: user.id,
                      });
                    }}
                    variant="outlined"
                  >
                    Invite
                  </Button>
                )}
              </Stack>
            </Box>
          ))}
          {$inviteUsers.hasNextPage && (
            <Button
              disabled={!$inviteUsers.hasNextPage || $inviteUsers.isFetchingNextPage}
              ref={ref}
              onClick={() => $inviteUsers.fetchNextPage()}
            >
              {$inviteUsers.isFetchingNextPage
                ? 'Loading more users'
                : $inviteUsers.hasNextPage
                  ? 'Show more'
                  : 'No more users'}
            </Button>
          )}
        </Stack>
        <Button
          onClick={() => handleShare(appreciationUrl, 'Join our Group', 'Check out this link to join our group!')}
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
    </Dialog>
  );
};

export default IntivationDialog;
