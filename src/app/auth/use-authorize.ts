import { useCallback, useRef } from 'react';
import { AuthUser } from '../../api/auth/auth.schema';
import { jwtDecode } from 'jwt-decode';
import { UserState } from './use-auth';
import { AccessTokenPayload, TAccessTokenPayload, setGlobalAccessToken } from './access-token';
import { useLogoutAcrossTabs } from './use-logout-across-tabs';
import * as Sentry from '@sentry/react';
import { socket } from 'src/socket';

type Args = {
  setUser: (user: UserState) => void;
  refetchRefreshToken: () => void;
};

export const useAuthorize = ({ setUser, refetchRefreshToken }: Args) => {
  const refreshTimeoutRef = useRef<number | null>(null);

  const authorize = useCallback(
    (user: AuthUser) => {
      const payload: AccessTokenPayload = jwtDecode(user.tokens.accessToken);

      const decodedPayload = TAccessTokenPayload.safeParse(payload);

      if (decodedPayload.success) {
        setGlobalAccessToken(user.tokens.accessToken);

        setUser({
          state: 'authenticated',
          info: user,
        });

        Sentry.setUser({
          id: user.user.id,
          name: user.user.name,
          email: user.user.email ?? undefined,
          role: user.user.role,
        });

        const expiresIn = payload.exp * 1000 - Date.now();

        localStorage.setItem('refresh-token', user.tokens.refreshToken);

        socket.connect();
        socket.emit('joinUserRoom', user.user.id);

        refreshTimeoutRef.current = window.setTimeout(() => {
          refreshTimeoutRef.current = null;
          refetchRefreshToken();
        }, expiresIn);
      } else {
        setUser({
          state: 'unauthenticated',
        });
      }
    },
    [refetchRefreshToken, setUser],
  );

  const unauthorize = useLogoutAcrossTabs(
    useCallback(() => {
      setGlobalAccessToken(null);
      localStorage.removeItem('refresh-token');
      setUser({ state: 'unauthenticated' });
      Sentry.setUser(null);
      if (refreshTimeoutRef.current !== null) {
        window.clearTimeout(refreshTimeoutRef.current);
      }
    }, [setUser]),
  );

  return {
    authorize,
    unauthorize,
  };
};
