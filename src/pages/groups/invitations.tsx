import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import InvitationItem from "src/components/invitation-component";
import { getInvitations } from "src/api/group";
import { useAuthContext } from "src/providers/auth";

const Invitation: React.FC = () => {
  const { userData } = useAuthContext();
  const userId = userData.data?.user._id || "";
  console.log(userId);
  const {
    data: groups,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["groups"],
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
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Invitation
      </Typography>
      <Box>
        {groups?.data.map((group) => (
          <InvitationItem
            key={group._id}
            group={group}
            onAccept={handleAccept}
            onDecline={handleDecline}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Invitation;
