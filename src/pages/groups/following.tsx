import { Box, Typography, List, CircularProgress } from "@mui/material";
import GroupItem from "src/components/join-group-item";
import { useQuery } from "@tanstack/react-query";
import { userGroups } from "src/api/group";

const Following = () => {
  const {
    data: groups,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => userGroups(),
  });

  if (isLoading) return <CircularProgress />;
  if (isError) return <div>Error</div>;
  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Following
      </Typography>
      <List>
        {groups.data.map((group) => (
          <GroupItem key={group._id} group={group} />
        ))}
      </List>
    </Box>
  );
};

export default Following;
