import { Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getGroups, Group } from '~/api/groups';
import Loader from 'src/components/loader';
import GroupItem from 'src/components/group-item';
import { qk } from 'src/api/query-keys';

export const GroupsList = () => {
  const { data: groups, isFetching } = useQuery({
    queryKey: qk.groups.list.toKey(),
    queryFn: getGroups,
  });

  return isFetching ? (
    <Loader />
  ) : (
    <Stack paddingBottom={10} my={1} gap={1}>
      {groups?.data.map((group: Group, i: number) => <GroupItem key={i} group={group} />)}
    </Stack>
  );
};
