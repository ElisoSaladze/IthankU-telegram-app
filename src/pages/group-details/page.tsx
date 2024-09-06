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

import { generatePath, Params, useNavigate, useParams } from 'react-router-dom';
import { getGroupDetails, getGroupPosts, joinGroup, leaveGroup } from '~/api/groups';
import Loader from 'src/components/loader';
import PostItem from 'src/components/post-item';
import TagItem from 'src/components/tag';
import qrIcon from 'src/assets/icons/qr.png';
import { qk } from 'src/api/query-keys';
import { Post } from 'src/api/posts';
import { IconArrow } from '~/assets/icons';
import { paths } from '~/app/routes';
import { ReactNode } from 'react';
import { GroupUsers, WritePost } from './components';
import IntivationDialog from '~/components/invite-users';
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

export const GroupDetailsPage = () => {
  const navigate = useNavigate();
  const { groupId } = useParams<Params>();

  const args = { groupId: groupId! };

  console.log({ args });

  const { data, isFetching, refetch } = useQuery({
    queryKey: qk.groups.details.toKeyWithArgs(args),
    queryFn: () => getGroupDetails(args),
  });

  const posts = useQuery({
    queryKey: qk.groups.posts.toKeyWithArgs(args),
    queryFn: () => getGroupPosts(args),
  });

  const $joinGroup = useMutation({
    mutationFn: joinGroup,
  });

  const handleJoinGroup = () => {
    $joinGroup.mutate(
      { groupId: groupId! },
      {
        onSuccess: () => {
          refetch();
        },
      },
    );
  };

  const $leaveGroup = useMutation({
    mutationFn: leaveGroup,
  });

  const handleLeaveGroup = () => {
    $leaveGroup.mutate(
      {
        groupId: groupId!,
      },
      {
        onSuccess: () => {
          refetch();
        },
      },
    );
  };

  const isInvitationDialogOpen = useBoolean();

  return (
    <Stack height="100vh">
      <AppBar
        sx={{
          position: 'fixed',
          bgcolor: 'transparent',
          p: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <IconWrapper onClick={() => navigate(paths.groups)}>
            <IconArrow direction="left" sx={{ color: 'white', fontSize: 18 }} />
          </IconWrapper>

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
                  {data?.data.privacy === 'PUBLIC' ? 'Public group ' : 'Private Group '}• {data?.data.membersCount}{' '}
                  members
                </Typography>
              </Stack>
            </Stack>

            <Stack gap={0.5} direction={'row'} flexWrap={'wrap'}>
              {data?.data.tags?.map((tag: string, index: number) => <TagItem key={index} tag={tag} />)}
            </Stack>

            {groupId && <GroupUsers owner={data!.data.owner.id} groupId={groupId} />}

            <Stack gap={1} direction={'row'}>
              {data?.data.isUserJoined ? (
                <Button
                  startIcon={<HowToRegIcon />}
                  sx={{ borderRadius: 4 }}
                  size="medium"
                  fullWidth
                  variant="contained"
                  onClick={handleLeaveGroup}
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
                  onClick={handleJoinGroup}
                >
                  Join
                </Button>
              )}
              <Button
                onClick={() => navigate(`/invite-user/${groupId}`)}
                startIcon={<PersonAddAlt1Icon />}
                sx={{ borderRadius: 4 }}
                size="medium"
                color="success"
                fullWidth
                variant="contained"
              >
                Share
              </Button>
              <IconButton
                onClick={() => {
                  if (groupId) {
                    navigate(
                      generatePath(paths.invitationQR, {
                        groupId,
                      }),
                      {
                        state: {
                          groupName: data?.data.name,
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

            <WritePost groupId={groupId} />

            {posts.isFetching ? (
              <Loader />
            ) : (
              posts.data?.data.map((post: Post) => <PostItem key={post.id} post={post} />)
            )}
          </Stack>
        </Box>
      )}
      <IntivationDialog
        groupId={groupId!}
        isOpen={isInvitationDialogOpen.isTrue}
        onClose={isInvitationDialogOpen.setFalse}
      />
    </Stack>
  );
};
