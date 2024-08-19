import { Typography, CircularProgress, Stack } from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import { userGroups } from "src/api/group";
import GroupItem from "src/components/group-item";

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
    <Stack p={2} paddingBottom={10} gap={1} alignItems={"center"}>
      <Typography variant="h6" gutterBottom>
        Following
      </Typography>

      {groups.data.map((group) => (
        <GroupItem key={group._id} group={group} />
      ))}
    </Stack>
  );
};

export default Following;
