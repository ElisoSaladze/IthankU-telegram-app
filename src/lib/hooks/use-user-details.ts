import { useQuery } from '@tanstack/react-query';
import constate from 'constate';
import { getUser } from '~/api/users';
import { qk } from '~/api/query-keys';
import { useAuthUser } from '~/app/auth';

const useUserDetailsContext = () => {
  const authUser = useAuthUser();

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    enabled: authUser !== null,
    queryKey: qk.users.details.toKeyWithArgs({ userId: authUser?.user._id ?? '' }),
    queryFn: () => getUser({ userId: authUser?.user._id ?? '' }),
  });

  return {
    user,
    refetch,
    isLoading,
  } as const;
};

export const [UserDetailsProvider, useUserDetails] = constate(useUserDetailsContext);
