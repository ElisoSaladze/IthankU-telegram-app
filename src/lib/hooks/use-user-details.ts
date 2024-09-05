import { useQuery } from '@tanstack/react-query';
import constate from 'constate';
import { qk } from '~/api/query-keys';
import { getCurrentUser } from '~/api/users';
import { useAuthUser } from '~/app/auth';

const useUserDetailsContext = () => {
  const authUser = useAuthUser();

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    enabled: authUser !== null,
    queryKey: qk.users.me.toKey(),
    queryFn: getCurrentUser,
  });

  return {
    user: user?.data,
    refetch,
    isLoading,
  } as const;
};

export const [UserDetailsProvider, useUserDetails] = constate(useUserDetailsContext);
