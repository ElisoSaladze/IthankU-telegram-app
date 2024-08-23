import {
  Typography,
  Stack,
  ListItemButton,
  Avatar,
  IconButton,
  Box,
  Skeleton,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { match, P } from "ts-pattern";

import { leaveGroup, userGroups } from "src/api/group";
import ShadeComponent from "src/components/shade-component";
import TagItem from "src/components/tag";
import defaultImageUrl from "src/assets/images/itu-circle.png";
import LogoutIcon from "@mui/icons-material/Logout";

const Following = () => {
  const $groups = useQuery({
    queryKey: ["groups"],
    queryFn: userGroups,
  });

  const { mutate: leave } = useMutation({
    mutationKey: ["join-group"],
    mutationFn: (groupId: string) => leaveGroup(groupId),
    onSuccess: () => $groups.refetch(),
  });

  return (
    <Stack p={3} pb={10} gap={1} alignItems="center">
      <Typography variant="h6" gutterBottom>
        Following
      </Typography>

      {match($groups)
        .with({ isLoading: true }, () => (
          <>
            <Skeleton variant="rectangular" height={80} width="100%" />
            <Skeleton variant="rectangular" height={80} width="100%" />
            <Skeleton variant="rectangular" height={80} width="100%" />
          </>
        ))
        .with({ isError: true }, () => (
          <Typography>Error loading groups.</Typography>
        ))
        .with({ isSuccess: true, data: P.select() }, (groups) =>
          groups.data.map((group) => (
            <ListItemButton
              key={group._id}
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
                <Stack gap={2} alignItems="center" direction="row">
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
                        bgcolor: group.shadeInfo?.color,
                        position: "absolute",
                        bottom: -5,
                        right: -10,
                      }}
                    >
                      <Typography fontWeight={600} fontSize={10} color="white">
                        {group.membersCount}
                      </Typography>
                    </Avatar>
                  </Box>
                  <Stack gap={0.5}>
                    <Typography fontSize={15} fontWeight={600}>
                      {group.name}
                    </Typography>
                    <ShadeComponent
                      color={group.shadeInfo?.color}
                      name={group.shadeInfo?.en}
                    />
                    <Stack direction="row">
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
          ))
        )
        .otherwise(() => (
          <>
            <Skeleton variant="rectangular" height={80} width={1} />
            <Skeleton variant="rectangular" height={80} width={1} />
          </>
        ))}
    </Stack>
  );
};

export default Following;
