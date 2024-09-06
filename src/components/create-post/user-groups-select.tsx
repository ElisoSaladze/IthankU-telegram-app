import { Control } from 'react-hook-form';
import { CreatePostFormValues } from './create-post-form';
import { ControlledSelect } from '../form/controlled/controlled-select';
import { useQuery } from '@tanstack/react-query';
import { getUserGroups } from '~/api/groups';
import { qk } from '~/api/query-keys';
import { useAuthUser } from '~/app/auth';
import { match, P } from 'ts-pattern';
import { Box, Skeleton, Typography } from '@mui/material';

type Props = {
  control: Control<CreatePostFormValues>;
};

export const UserGroupsSelect = ({ control }: Props) => {
  const authUser = useAuthUser();

  const $userGroups = useQuery({
    queryKey: qk.groups.getUserGroups.toKeyWithArgs({ userId: authUser?.user.id ?? '' }),
    queryFn: () => getUserGroups({ userId: authUser?.user.id ?? '' }),
    enabled: authUser !== null,
  });

  return (
    <Box sx={{ width: 1, position: 'relative' }}>
      {match($userGroups)
        .with({ isLoading: true }, () => <Skeleton variant="rounded" sx={{ width: 1, height: 40 }} />)
        .with({ error: true }, () => <Typography color="text.secondary">Failed to get user groups</Typography>)
        .with({ isSuccess: true, data: P.select() }, ({ data: groups }) => {
          return (
            <ControlledSelect
              control={control}
              name="groupId"
              options={groups.map((group) => ({ label: group.name, value: group.id }))}
              fullWidth
              label="Group"
              placeholder="Choose group"
              required
            />
          );
        })
        .run()}
    </Box>
  );
};
