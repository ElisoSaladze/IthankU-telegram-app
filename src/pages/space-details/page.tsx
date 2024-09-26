/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import CircleIcon from '@mui/icons-material/Circle';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HowToRegIcon from '@mui/icons-material/HowToReg';

import SearchIcon from '@mui/icons-material/Search';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { AppBar, Avatar, Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';

import notificationsIcon from 'src/assets/icons/white-notif.svg';
import defaultImageUrl from 'src/assets/images/itu-circle.png';

import { generatePath, Params, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getSpaceDetails, getSpacePosts, joinSpace, leaveSpace } from '~/api/spaces';
import Loader from 'src/components/loader';
import PostItem from 'src/components/post-item';
import TagItem from 'src/components/tag';
import qrIcon from 'src/assets/icons/qr.png';
import { qk } from 'src/api/query-keys';
import { Post } from 'src/api/posts';
import { paths } from '~/app/routes';
import { ReactNode } from 'react';
import { SpaceUsers, WritePost } from './components';
import { InvitationDialog } from '~/components/invite-users';
import { useBoolean } from '~/lib/hooks';

const IconWrapper = ({ children, onClick }: { children: ReactNode; onClick?: () => void }) => {
  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        cursor: 'pointer',
        bgcolor: 'rgba(217, 217, 217, 0.33)',
      }}
      onClick={onClick}
    >
      {children}
    </Box>
  );
};

export const SpaceDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { spaceId } = useParams<Params>();
  const { backPath } = location.state || {};

  const args = { spaceId: spaceId! };

  const { data, isFetching, refetch } = useQuery({
    queryKey: qk.spaces.details.toKeyWithArgs(args),
    queryFn: () => getSpaceDetails(args),
  });

  const posts = useQuery({
    queryKey: qk.spaces.posts.toKeyWithArgs(args),
    queryFn: () => getSpacePosts(args),
  });

  const $joinSpace = useMutation({
    mutationFn: joinSpace,
  });

  const handleJoinSpace = () => {
    $joinSpace.mutate(
      { spaceId: spaceId! },
      {
        onSuccess: () => {
          refetch();
        },
      },
    );
  };

  const $leaveSpace = useMutation({
    mutationFn: leaveSpace,
  });

  const handleLeaveSpace = () => {
    $leaveSpace.mutate(
      {
        spaceId: spaceId!,
      },
      {
        onSuccess: () => {
          refetch();
        },
      },
    );
  };

  const isInvitationDialogOpen = useBoolean();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const app = (window as any).Telegram!.WebApp;

  console.log({ backPath });

  app.BackButton.show();
  app.BackButton.onClick(() => navigate(backPath ?? paths.spaces));
  return (
    <Stack height="100vh">
      <AppBar
        sx={{
          position: 'fixed',
          bgcolor: 'transparent',
          p: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconWrapper>
              <img src={notificationsIcon} />
            </IconWrapper>

            <IconWrapper>
              <SearchIcon sx={{ color: 'white' }} />
            </IconWrapper>
          </Box>
        </Box>
      </AppBar>
      {isFetching ? (
        <Loader />
      ) : (
        <Box>
          <Stack
            sx={{
              width: '100%',
              height: 200,
              minHeight: 200,
              backgroundImage: `url(${data?.data.cover})`,
              backgroundSize: 'cover',
              backgroundPosition: 'top',
              backgroundColor: data?.data.cover ? 'transparent' : '#222222',
            }}
          />
          <Stack
            bgcolor="white"
            mx={2}
            mt={-10}
            boxShadow="0px 3px 8.6px -4px #00000040"
            gap={1}
            p={2}
            borderRadius={5}
          >
            <Typography fontWeight={600} fontSize={'large'}>
              {data?.data.name}
            </Typography>

            <Stack alignItems={'center'} gap={1} direction={'row'}>
              <Avatar
                sx={{ width: 70, height: 70, borderRadius: 4 }}
                variant="rounded"
                src={data?.data.picture || defaultImageUrl}
              />
              <Stack>
                {data?.data.shade && (
                  <Stack gap={0.5} alignItems={'center'} direction={'row'}>
                    <CircleIcon color="primary" />
                    <Typography fontSize={20} color={'info'}>
                      {data.data.shade.en}
                    </Typography>
                  </Stack>
                )}

                <Typography>
                  {data?.data.privacy === 'PUBLIC' ? 'Public space' : 'Private Space'}• {data?.data.membersCount}{' '}
                  members
                </Typography>
              </Stack>
            </Stack>

            <Stack gap={0.5} direction={'row'} flexWrap={'wrap'}>
              {data?.data.tags?.map((tag: string, index: number) => <TagItem key={index} tag={tag} />)}
            </Stack>

            {spaceId && <SpaceUsers owner={data!.data.owner.id} spaceId={spaceId} />}

            <Stack gap={1} direction={'row'}>
              {data?.data.isUserJoined ? (
                <Button
                  startIcon={<HowToRegIcon />}
                  sx={{ borderRadius: 4 }}
                  size="medium"
                  fullWidth
                  variant="contained"
                  onClick={handleLeaveSpace}
                >
                  Joined
                </Button>
              ) : (
                <Button
                  startIcon={<GroupAddIcon />}
                  sx={{ borderRadius: 4 }}
                  size="medium"
                  fullWidth
                  variant="contained"
                  onClick={handleJoinSpace}
                >
                  Join
                </Button>
              )}
              <Button
                onClick={() => isInvitationDialogOpen.setTrue()}
                startIcon={<PersonAddAlt1Icon />}
                sx={{ borderRadius: 4 }}
                size="medium"
                color="success"
                fullWidth
                variant="contained"
              >
                Invite
              </Button>
              <IconButton
                onClick={() => {
                  if (spaceId) {
                    navigate(
                      generatePath(paths.invitationQR, {
                        spaceId,
                      }),
                      {
                        state: {
                          spaceName: data?.data.name,
                          image: data?.data.picture,
                          background: data?.data.cover,
                        },
                      },
                    );
                  }
                }}
              >
                <img src={qrIcon} />
              </IconButton>
            </Stack>
          </Stack>

          {data?.data.description.trim().length! > 0 && (
            <Box m={2}>
              <Typography fontWeight={700} color="info.main" fontSize={20}>
                About
              </Typography>
              <Typography fontSize={16} color="black">
                {data?.data.description}
              </Typography>
            </Box>
          )}

          <Divider sx={{ border: 2, borderColor: '#DADEE3' }} />

          <Stack gap={1} m={2}>
            <Typography fontWeight={700} color="info.main" fontSize={20}>
              Posts
            </Typography>

            <WritePost spaceId={spaceId} />

            {posts.isFetching ? (
              <Loader />
            ) : (
              posts.data?.data.map((post: Post) => <PostItem key={post.id} post={post} />)
            )}
          </Stack>
        </Box>
      )}

      <InvitationDialog
        spaceId={spaceId!}
        isOpen={isInvitationDialogOpen.isTrue}
        onClose={isInvitationDialogOpen.setFalse}
      />
    </Stack>
  );
};
