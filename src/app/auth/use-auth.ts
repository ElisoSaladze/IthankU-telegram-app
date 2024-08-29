import { useCallback, useState } from 'react';
import { AuthUser } from '../../api/auth/auth.schema';
import { useAuthorize } from './use-authorize';
import constate from 'constate';
import { useBoolean } from '~/lib/hooks';
import { useMutation } from '@tanstack/react-query';
import { qk } from '~/api/query-keys';
import { refreshToken } from '~/api/auth';
import { useEffectOnce } from 'react-use';

export type UserState =
  | { state: 'loading' }
  | { state: 'authenticated'; info: AuthUser }
  | { state: 'unauthenticated' };

const useAuthContext = () => {
  const token = localStorage.getItem('refresh-token');

  const isRefreshed = useBoolean();
  const [user, setUser] = useState<UserState>({
    state: token ? 'loading' : 'unauthenticated',
  });

  const $refreshToken = useMutation({
    mutationFn: refreshToken,
    mutationKey: qk.auth.refresh.toKeyWithArgs({ refreshToken: token ?? '' }),
    onSuccess: (user) => {
      authorize(user);
      isRefreshed.setTrue();
    },
    onError: () => {
      unauthorize();
      isRefreshed.setTrue();
    },
    onMutate: () => {
      isRefreshed.setTrue();
    },
  });

  const mutateRefresh = useCallback(
    () => $refreshToken.mutateAsync({ refreshToken: token ?? '' }),
    [$refreshToken, token],
  );

  const { authorize, unauthorize } = useAuthorize({
    setUser,
    refetchRefreshToken: mutateRefresh,
  });

  useEffectOnce(() => {
    if (isRefreshed.isFalse) {
      mutateRefresh();
    }
  });

  return {
    authorize,
    unauthorize,
    user,
  };
};

export const [AuthProvider, useAuth] = constate(useAuthContext);

export const useAuthUser = () => {
  const { user } = useAuth();

  if (user.state === 'authenticated') {
    return user.info as AuthUser;
  }

  return null;
};
