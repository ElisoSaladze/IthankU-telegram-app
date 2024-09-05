import { Avatar, Box, Skeleton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { match, P } from 'ts-pattern';
import { getGroupMembers } from '~/api/groups';
import { qk } from '~/api/query-keys';

type Props = {
  groupId: string;
};

export const GroupUsers = ({ groupId }: Props) => {
  // TODO need to be added pagination
  const $groupUsers = useQuery({
    queryKey: qk.groups.members.toKeyWithArgs({ groupId }),
    queryFn: () => getGroupMembers({ groupId }),
  });

  return match($groupUsers)
    .with({ isLoading: true }, () => <Skeleton variant="rectangular" width={150} />)
    .with({ isSuccess: true, data: P.select() }, ({ data: users }) => {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {users.map((user) => (
            <Avatar alt={`user ${user.name}`} src={user.picture ?? ''} />
          ))}
        </Box>
      );
    })
    .run();
};
