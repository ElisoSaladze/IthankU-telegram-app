import { Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getSpaces, Space } from '~/api/spaces';
import Loader from 'src/components/loader';
import SpaceItem from 'src/components/space-item';
import { qk } from 'src/api/query-keys';

export const SpacesList = () => {
  const { data: spaces, isFetching } = useQuery({
    queryKey: qk.spaces.list.toKey(),
    queryFn: getSpaces,
  });

  return isFetching ? (
    <Loader />
  ) : (
    <Stack paddingBottom={10} my={1} gap={1}>
      {spaces?.data.map((space: Space, i: number) => <SpaceItem key={i} space={space} />)}
    </Stack>
  );
};
