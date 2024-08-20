import React from "react";
import { Box, Typography, Avatar, Button, Stack } from "@mui/material";
import { Group } from "src/api/group/types";
import ShadeComponent from "../shade-component";
import { useMutation } from "@tanstack/react-query";
import { acceptInvitation, declineInvitation } from "src/api/group";

type InvitationItemProps = {
  group: Group;
  refetch: () => void;
  id: string;
};

const InvitationItem: React.FC<InvitationItemProps> = ({
  group,
  refetch,
  id,
}) => {
  const { mutate: accept } = useMutation({
    mutationKey: ["accept-invitation"],
    mutationFn: () => acceptInvitation(id),
    onSuccess: refetch,
  });

  const { mutate: decline } = useMutation({
    mutationKey: ["accept-invitation"],
    mutationFn: () => declineInvitation(id),
    onSuccess: refetch,
  });
  return (
    <Stack
      gap={1}
      alignItems={"center"}
      direction={"row"}
      sx={{
        width: "100%",
        borderRadius: 5,
        padding: 1,
        boxShadow: "0px 0px 8.2px -1px #00000026",
      }}
    >
      <Box>
        <Avatar
          sx={{ width: 70, height: 70, borderRadius: 4 }}
          variant="rounded"
          src={group.groupImage}
        />
      </Box>
      <Stack gap={0.5} width={"100%"}>
        <Typography>{group.name}</Typography>

        <ShadeComponent color={group.shade} name={group.shade} />
        <Stack gap={1} direction={"row"}>
          <Button onClick={() => accept()} fullWidth variant="contained">
            Accept
          </Button>
          <Button
            onClick={() => decline()}
            fullWidth
            variant="contained"
            color="secondary"
          >
            Decline
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default InvitationItem;
