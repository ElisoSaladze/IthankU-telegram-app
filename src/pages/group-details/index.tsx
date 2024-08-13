/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import CircleIcon from "@mui/icons-material/Circle";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import QrCodeIcon from "@mui/icons-material/QrCode";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";

import arrowBackIosIcon from "src/assets/icons/goBack.svg";
import notificationsIcon from "src/assets/icons/white-notif.svg";
import defaultImageUrl from "src/assets/images/itu-circle.png";

import { Params, useNavigate, useParams } from "react-router-dom";
import {
  getGroupDetails,
  getGroupPosts,
  joinGroup,
  leaveGroup,
} from "src/api/group";
import LikesItem from "src/components/likes";
import Loader from "src/components/loader";
import PostItem from "src/components/post-item";
import TagItem from "src/components/tag";
import { useAuthContext } from "src/providers/auth";
import { Post } from "src/api/post/types";

const GroupDetailsPage = () => {
  const { userData } = useAuthContext();
  const { groupId } = useParams<Params>();
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["groupDetails", groupId],
    queryFn: () => getGroupDetails(groupId!),
  });
  const posts = useQuery({
    queryKey: ["groupPosts", groupId],
    queryFn: () => getGroupPosts(groupId!),
  });

  const join = useMutation({
    mutationKey: ["join-group"],
    mutationFn: () => joinGroup(groupId!),
    onSuccess: () => refetch(),
  });

  const handleJoinGroup = () => {
    join.mutate();
  };
  const leave = useMutation({
    mutationKey: ["join-group"],
    mutationFn: () => leaveGroup(groupId!),
    onSuccess: () => refetch(),
  });

  const handleLeaveGroup = () => {
    leave.mutate();
  };
  const navigate = useNavigate();
  return (
    <Stack>
      <AppBar
        sx={{
          position: "fixed",
          backgroundColor: "transparent",
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton
              sx={{ background: "#D9D9D954", borderRadius: 3, width: 38 }}
              onClick={() => navigate(-1)}
            >
              <img src={arrowBackIosIcon} />
            </IconButton>
          </Box>
          <IconButton
            sx={{ background: "#D9D9D954", borderRadius: 3, marginRight: 0.5 }}
          >
            <img src={notificationsIcon} />
          </IconButton>
          <IconButton sx={{ background: "#D9D9D954", borderRadius: 3 }}>
            <SearchIcon sx={{ color: "white" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      {isFetching ? (
        <Loader />
      ) : (
        <Stack
          sx={{
            width: "100%",
            height: 200,
            backgroundImage: `url(${data?.data.groupCover})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundColor: data?.data.groupCover ? "transparent" : "#222222",
          }}
        >
          <Stack
            bgcolor={"white"}
            m={2}
            marginTop={10}
            boxShadow={"0px 3px 8.6px -4px #00000040"}
            gap={1}
            p={2}
            borderRadius={5}
          >
            <Typography fontWeight={600} fontSize={"large"}>
              {data?.data.name}
            </Typography>
            <Stack alignItems={"center"} gap={1} direction={"row"}>
              <Avatar
                sx={{ width: 70, height: 70, borderRadius: 4 }}
                variant="rounded"
                src={data?.data.groupImage || defaultImageUrl}
              />
              <Stack>
                <Stack gap={0.5} alignItems={"center"} direction={"row"}>
                  <CircleIcon color="primary" />
                  <Typography fontSize={20} color={"info"}>
                    {data?.data.shade}
                  </Typography>
                </Stack>

                <Typography>
                  {data?.data.groupPrivacy === "Public"
                    ? "Public group "
                    : "Private Group "}
                  • {data?.data.membersCount} members
                </Typography>
              </Stack>
            </Stack>
            <Stack gap={0.5} direction={"row"} flexWrap={"wrap"}>
              {data?.data.tags?.map((tag: string, index: number) => (
                <TagItem key={index} tag={tag} />
              ))}
            </Stack>
            <LikesItem
              size="medium"
              likes={data?.data.users ? data?.data.users : []}
            />
            <Stack gap={1} direction={"row"}>
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
                sx={{ borderRadius: 4 }}
                size="medium"
                color="info"
                fullWidth
                variant="contained"
              >
                Share
              </Button>
              <IconButton>
                <QrCodeIcon color="info" fontSize="large" />
              </IconButton>
            </Stack>
          </Stack>
          {data?.data.description.trim().length! > 0 && (
            <Stack m={2}>
              <Typography fontWeight={600} fontSize={"large"}>
                About
              </Typography>
              <Typography>{data?.data.description}</Typography>
            </Stack>
          )}
          <Divider />
          <Stack gap={1} m={2}>
            <Typography fontWeight={600} fontSize={"large"}>
              Posts
            </Typography>
            <ListItemButton
              sx={{
                padding: 2,
                boxShadow: "0px 0px 8.9px -3px #00000040",
                borderRadius: 3,
              }}
              onClick={() => navigate(`/create-post/${groupId}`)}
            >
              <Stack
                width={"100%"}
                gap={2}
                alignItems={"center"}
                direction={"row"}
              >
                <Avatar src={userData.data?.user.picture} />
                <Typography>Write something...</Typography>
              </Stack>
            </ListItemButton>
            {posts.isFetching ? (
              <Loader />
            ) : (
              posts.data?.data.map((post: Post) => (
                <PostItem key={post._id} post={post} />
              ))
            )}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default GroupDetailsPage;
