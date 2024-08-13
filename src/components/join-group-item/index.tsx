import DoneIcon from "@mui/icons-material/Done";
import {
  Avatar,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";

import React, { useState } from "react";
import { joinGroup } from "../../api/group";
import { Group } from "../../api/group/types";
import ShadeComponent from "../shade-component";
type Props = {
  group: Group;
};
const GroupItem = ({ group }: Props) => {
  const [joined, setJoined] = useState(false);
  const join = useMutation({
    mutationKey: ["join-group"],
    mutationFn: () => joinGroup(group._id),
    onSuccess: () => setJoined(true),
  });

  const handleJoinGroup = () => {
    join.mutate();
    if (join.isSuccess) {
      setJoined(true);
    }
  };
  return (
    <Stack
      width={"100%"}
      justifyContent={"space-between"}
      alignItems={"center"}
      direction={"row"}
    >
      <Stack gap={1} alignItems={"center"} direction={"row"}>
        <Avatar sx={{ height: 62, width: 62 }} src={group.groupImage} />
        <Stack>
          <Typography fontSize={15} fontWeight={600}>
            {group.name}
          </Typography>
          <Typography fontSize={12} color="secondary.dark">
            {group.membersCount} Members
          </Typography>
          <ShadeComponent color="green" name={group.shade} />
        </Stack>
      </Stack>
      {join.isLoading ? (
        <CircularProgress />
      ) : !joined ? (
        <Button size="small" variant="outlined" onClick={handleJoinGroup}>
          join
        </Button>
      ) : (
        <DoneIcon color="primary" sx={{ marginRight: 2 }} />
      )}
    </Stack>
  );
};

export default GroupItem;
