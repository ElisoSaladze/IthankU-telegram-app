import { AppBar, Avatar, Box, Button, Dialog, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { useMutation, useInfiniteQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { match, P } from 'ts-pattern';
import { getUsersToInvite, inviteUser } from '~/api/spaces';
import { qk } from '~/api/query-keys';
import { ControlledTextField } from '../form/controlled/controlled-text-field';
import SearchIcon from '@mui/icons-material/Search';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { paths } from '~/app/routes';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  spaceId: string;
};

export const InvitationDialog = ({ isOpen, onClose, spaceId }: Props) => {
  const navigate = useNavigate();

  const [ref, inView] = useInView();
  const { control, watch } = useForm({
    defaultValues: {
      name: '',
    },
  });

  const $inviteUsers = useInfiniteQuery({
    queryKey: qk.spaces.getUserToInvite.toKeyWithArgs({ spaceId }),
    queryFn: async ({ pageParam = 1 }) => getUsersToInvite({ spaceId, page: pageParam }),
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

  const $inviteUser = useMutation({
    mutationFn: inviteUser,
    onSuccess: () => $inviteUsers.refetch(),
  });

  const handleBackButtonClick = () => {
    onClose(); // Close the dialog
    navigate(
      generatePath(paths.spaceDetails, {
        spaceId,
      }),
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const app = (window as any).Telegram!.WebApp;
  if (isOpen) {
    app.BackButton.show();
    app.BackButton.onClick(() => handleBackButtonClick());
  }

  useEffect(() => {
    if (inView && $inviteUsers.hasNextPage) {
      $inviteUsers.fetchNextPage();
    }
  }, [$inviteUsers, inView]);

  return (
    <Dialog fullScreen open={isOpen} onClose={onClose}>
      <Stack overflow="hidden" justifyContent="space-between" height="100vh">
        <Stack paddingBottom={2} gap={1} bgcolor="#21A54D" color="white" textAlign="center">
          <AppBar sx={{ backgroundColor: 'transparent' }}>
            <Toolbar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  mx={2}
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
            Help grow our space by inviting others. Use the search field below to find and invite new members or share
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
        <Stack p={2} gap={1} overflow="auto" height="100%">
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
                        spaceId: spaceId!,
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
      </Stack>
    </Dialog>
  );
};
