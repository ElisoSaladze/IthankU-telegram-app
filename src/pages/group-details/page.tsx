/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import CircleIcon from '@mui/icons-material/Circle';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HowToRegIcon from '@mui/icons-material/HowToReg';

import SearchIcon from '@mui/icons-material/Search';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { AppBar, Avatar, Box, Button, Divider, IconButton, ListItemButton, Stack, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';

import notificationsIcon from 'src/assets/icons/white-notif.svg';
import defaultImageUrl from 'src/assets/images/itu-circle.png';

import { Params, useNavigate, useParams } from 'react-router-dom';
import { getGroupDetails, getGroupPosts, joinGroup, leaveGroup } from '~/api/groups';
import LikesItem from 'src/components/likes';
import Loader from 'src/components/loader';
import PostItem from 'src/components/post-item';
import TagItem from 'src/components/tag';
import qrIcon from 'src/assets/icons/qr.png';
import { qk } from 'src/api/query-keys';
import { Post } from 'src/api/posts';
import { useAuthUser } from '~/app/auth';
import { IconArrow } from '~/assets/icons';
import { paths } from '~/app/routes';
import { ReactNode } from 'react';

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
  const authUser = useAuthUser();
  const { groupId } = useParams<Params>();

  const args = { groupId: groupId! };

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
        <Stack
          sx={{
            width: '100%',
            height: 200,
            backgroundImage: `url(${data?.data.groupCover})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            backgroundColor: data?.data.groupCover ? 'transparent' : '#222222',
          }}
        >
          <Stack
            bgcolor="white"
            m={2}
            marginTop={10}
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
                src={data?.data.groupImage || defaultImageUrl}
              />
              <Stack>
                <Stack gap={0.5} alignItems={'center'} direction={'row'}>
                  <CircleIcon color="primary" />
                  <Typography fontSize={20} color={'info'}>
                    {data?.data.shade}
                  </Typography>
                </Stack>

                <Typography>
                  {data?.data.groupPrivacy === 'Public' ? 'Public group ' : 'Private Group '}• {data?.data.membersCount}{' '}
                  members
                </Typography>
              </Stack>
            </Stack>
            <Stack gap={0.5} direction={'row'} flexWrap={'wrap'}>
              {data?.data.tags?.map((tag: string, index: number) => <TagItem key={index} tag={tag} />)}
            </Stack>
            <LikesItem size="medium" likes={data?.data.users ? data?.data.users : []} />
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
                onClick={() =>
                  navigate(`/invitation-qr/${groupId}`, {
                    state: {
                      groupName: data?.data.name,
                      image: data?.data.groupImage!,
                      background: data?.data.groupCover!,
                    },
                  })
                }
              >
                <img src={qrIcon} />
              </IconButton>
            </Stack>
          </Stack>
          {data?.data.description.trim().length! > 0 && (
            <Stack m={2}>
              <Typography fontWeight={600} fontSize={'large'}>
                About
              </Typography>
              <Typography>{data?.data.description}</Typography>
            </Stack>
          )}
          <Divider />
          <Stack gap={1} m={2}>
            <Typography fontWeight={600} fontSize={'large'}>
              Posts
            </Typography>
            <ListItemButton
              sx={{
                padding: 2,
                boxShadow: '0px 0px 8.9px -3px #00000040',
                borderRadius: 3,
              }}
              onClick={() => navigate(`/create-post/${groupId}`)}
            >
              <Stack width={'100%'} justifyContent={'space-between'} alignItems={'center'} direction={'row'}>
                <Stack gap={2} alignItems={'center'} direction={'row'}>
                  <Avatar src={authUser?.user.picture} />
                  <Typography>Write something...</Typography>
                </Stack>
                <Button onClick={() => navigate(`/create-post/${groupId}`)} variant="outlined">
                  Post
                </Button>
              </Stack>
            </ListItemButton>
            {posts.isFetching ? (
              <Loader />
            ) : (
              posts.data?.data.map((post: Post) => <PostItem key={post._id} post={post} />)
            )}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
