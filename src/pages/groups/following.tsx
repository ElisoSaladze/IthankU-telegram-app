import {
  Typography,
  CircularProgress,
  Stack,
  ListItemButton,
  Avatar,
  IconButton,
  Box,
} from "@mui/material";

import { useMutation, useQuery } from "@tanstack/react-query";

import { leaveGroup, userGroups } from "src/api/group";
import ShadeComponent from "src/components/shade-component";
import TagItem from "src/components/tag";
import defaultImageUrl from "src/assets/images/itu-circle.png";
import LogoutIcon from "@mui/icons-material/Logout";

const Following = () => {
  const {
    data: groups,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => userGroups(),
  });

  const { mutate: leave } = useMutation({
    mutationKey: ["join-group"],
    mutationFn: (groupId: string) => leaveGroup(groupId),
    onSuccess: () => refetch(),
  });

  if (isLoading) return <CircularProgress />;
  if (isError) return <div>Error</div>;
  return (
    <Stack p={2} paddingBottom={10} gap={1} alignItems={"center"}>
      <Typography variant="h6" gutterBottom>
        Following
      </Typography>

      {groups.data.map((group) => (
        <ListItemButton
          sx={{
            width: "100%",
            borderRadius: 5,
            padding: 1,
            boxShadow: "0px 0px 8.2px -1px #00000026",
          }}
        >
          <Stack
            sx={{ width: "100%" }}
            alignItems={"center"}
            justifyContent={"space-between"}
            direction={"row"}
          >
            <Stack gap={2} alignItems={"center"} direction={"row"}>
              <Box paddingY={0.5} position={"relative"}>
                <Avatar
                  sx={{ width: 70, height: 70, borderRadius: 4 }}
                  variant="rounded"
                  src={group.groupImage || defaultImageUrl}
                />
                <Avatar
                  sx={{
                    height: 35,
                    width: 35,
                    bgcolor: "black",
                    position: "absolute",
                    bottom: -5,
                    right: -10,
                  }}
                >
                  <Typography fontSize={10} color="white">
                    {group.membersCount}
                  </Typography>
                </Avatar>
              </Box>
              <Stack gap={0.5}>
                <Typography fontSize={15} fontWeight={600}>
                  {group.name}
                </Typography>
                <ShadeComponent color="green" name={group.shade} />
                <Stack direction={"row"}>
                  {group.tags?.map((tag, i) => (
                    <TagItem key={i} tag={tag} />
                  ))}
                </Stack>
              </Stack>
            </Stack>
            <IconButton onClick={() => leave(group._id)}>
              <LogoutIcon fontSize="large" />
            </IconButton>
          </Stack>
        </ListItemButton>
      ))}
    </Stack>
  );
};

export default Following;
