import React from "react";
import { Box, Typography, CircularProgress, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import InvitationItem from "src/components/invitation-component";
import { getInvitations } from "src/api/group";
import { useAuthContext } from "src/providers/auth";

const Invitation: React.FC = () => {
  const { userData } = useAuthContext();
  const userId = userData.data?.user._id || "";

  const {
    data: invitations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get-invitations"],
    queryFn: async () => getInvitations(userId),
  });

  const handleAccept = (groupId: string) => {
    console.log("Accept invitation", groupId);
  };

  const handleDecline = (groupId: string) => {
    console.log("Decline invitation", groupId);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography color="error">
          Error: {"Failed to fetch invitations"}
        </Typography>
      </Box>
    );
  }

  return (
    <Stack alignItems={"center"} p={2}>
      <Typography variant="h6" gutterBottom>
        Invitation
      </Typography>

      {invitations?.data.length > 0 ? (
        invitations!.data.map((invitation) => (
          <InvitationItem
            key={invitation._id}
            group={invitation.group}
            onAccept={handleAccept}
            onDecline={handleDecline}
          />
        ))
      ) : (
        <Typography>You do not have any invitation</Typography>
      )}
    </Stack>
  );
};

export default Invitation;
