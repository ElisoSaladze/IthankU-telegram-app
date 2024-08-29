import { useCallback, useRef } from 'react';
import { AuthUser } from '../../api/auth/auth.schema';
import { jwtDecode } from 'jwt-decode';
import { UserState } from './use-auth';
import { AccessTokenPayload, TAccessTokenPayload, setGlobalAccessToken } from './access-token';
import { useLogoutAcrossTabs } from './use-logout-across-tabs';
import { socket } from 'src/socket';

type Args = {
  setUser: (user: UserState) => void;
  refetchRefreshToken: () => void;
};

export const useAuthorize = ({ setUser, refetchRefreshToken }: Args) => {
  const refreshTimeoutRef = useRef<number | null>(null);

  const authorize = useCallback(
    (user: AuthUser) => {
      const payload: AccessTokenPayload = jwtDecode(user.accessToken);

      const decodedPayload = TAccessTokenPayload.safeParse(payload);

      if (decodedPayload.success) {
        setGlobalAccessToken(user.accessToken);

        setUser({
          state: 'authenticated',
          info: user,
        });

        const expiresIn = payload.exp * 1000 - Date.now();

        localStorage.setItem('refresh-token', user.refreshToken);

        socket.connect();
        socket.emit('joinUserRoom', user.user._id);

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
