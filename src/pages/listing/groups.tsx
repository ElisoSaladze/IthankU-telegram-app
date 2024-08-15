import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { getGroups } from "src/api/group";
import Loader from "src/components/loader";
import GroupItem from "src/components/group-item";
import { Group } from "src/api/group/types";

const GroupsList = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => getGroups(),
  });
  return isFetching ? (
    <Loader />
  ) : (
    <Stack paddingBottom={10} marginY={1} gap={1}>
      {data?.data.map((group: Group, i: number) => (
        <GroupItem key={i} group={group} />
      ))}
    </Stack>
  );
};

export default GroupsList;
