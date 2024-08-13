import { useQuery } from "@tanstack/react-query";
import { retrieveLaunchParams } from "@telegram-apps/sdk";

import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import { useLogoutAcrossTabs } from "./logout-across-tabs";
import { jwtDecode } from "jwt-decode";
import constate from "constate";
import { checkUser, reissueToken } from "../api/auth/api";
import { keys } from "src/api/keys";

type NotAuthUser = {
  state: "unauthenticated";
};
type UserType = {
  email: string;
  isLocationPublic: boolean;
  name: string;
  physicalPoints: number;
  picture: string;
  ratingPoints: number;
  role: string;
  _id: string;
};
export type AuthUserResponse = {
  accessToken: string;
  refreshToken: string;
  status: string;
  user: UserType;
};

export type AuthUser = {
  state: "authenticated";
} & AuthUserResponse;

type User = NotAuthUser | AuthUser;

export let globalAccessToken: string | null = null;

/**
 * Sets the global access token.
 *
 * @param accessToken The access token to set.
 */
export const setGlobalAccessToken = (accessToken: string | null) => {
  globalAccessToken = accessToken;
};

const cookies = new Cookies();

/**
 * Custom hook for handling authentication logic.
 *
 * @returns An object containing authentication-related state and functions.
 */
const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User>({
    state: cookies.get("refreshToken") ? "authenticated" : "unauthenticated",
  } as User);

  const { handleSubmit, setValue, control, watch } = useForm({
    defaultValues: {
      telegramId: "",
      name: "",
      bio: "",
      interest: [] as { value: string }[],
      picture: "",
    },
  });

  const refreshTimeoutRef = useRef<number | null>(null);

  useQuery(keys.reissueToken.token(), reissueToken, {
    enabled: Boolean(cookies.get("refreshToken")),
    staleTime: Number.POSITIVE_INFINITY,
    onSuccess: (user) => {
      authorize(user);
    },
    onError: () => {
      unauthorize();
    },
  });

  /**
   * Authorizes the user.
   *
   * @param user The user response object containing the access token.
   */
  const authorize = useCallback((user: AuthUserResponse) => {
    if (user) {
      const decodedJWT: { exp: number } = jwtDecode(user.refreshToken);
      const expiresIn = decodedJWT.exp * 1000 - Date.now();

      const expires = new Date();
      expires.setTime(expiresIn);

      setGlobalAccessToken(user.accessToken);

      cookies.set("refreshToken", user.refreshToken, {
        path: "/",
        expires: new Date(2_147_483_647 * 1000),
      });

      const newUser: AuthUser = {
        state: "authenticated",
        ...user,
      };

      setCurrentUser(newUser);

      // refreshTimeoutRef.current = window.setTimeout(() => {
      //   refreshTimeoutRef.current = null
      //   refetchRefreshToken()
      // }, expiresIn)
    } else {
      setCurrentUser({ state: "unauthenticated" });
    }
  }, []);

  /**
   * Initializes the user state.
   *
   * @param user A boolean indicating whether the user is authenticated.
   */
  const initialize = useCallback((user: boolean) => {
    if (user) {
      const newUser: NotAuthUser = {
        state: "unauthenticated",
      };

      setCurrentUser(newUser);
    } else {
      setCurrentUser({ state: "unauthenticated" });
    }
  }, []);

  const navigate = useNavigate();
  /**
   * Unauthorizes the user and performs necessary cleanup.
   */
  const unauthorize = useLogoutAcrossTabs(
    useCallback(() => {
      setGlobalAccessToken(null);
      cookies.remove("refreshToken");
      setCurrentUser({ state: "unauthenticated" });
      if (refreshTimeoutRef.current !== null) {
        window.clearTimeout(refreshTimeoutRef.current);
      }
      navigate("/onBoarding");
    }, [navigate])
  );

  const initializeNewUser = useCallback(() => {
    const { initData } = retrieveLaunchParams();
    const newUser: NotAuthUser = {
      state: "unauthenticated",
    };

    setCurrentUser(newUser);
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    setValue("telegramId", initData?.user?.id.toString()!);
    setValue(
      "name",
      initData?.user?.firstName + " " + initData?.user?.lastName
    );
  }, [setValue]);

  const userData = useQuery({
    queryKey: ["checkUser"],
    queryFn: async () => checkUser(),
    onSuccess: (data) => authorize(data),
    onError: () => {
      initializeNewUser();
      unauthorize();
    },
  });

  return {
    watch,
    control,
    handleSubmit,
    setValue,
    currentUser,
    userData,
    setCurrentUser,
    authorize,
    initialize,
    unauthorize,
    isAuthenticated: currentUser.state === "authenticated",
    state: currentUser.state,
  } as const;
};
/**
 * Provider component for managing authentication state.
 */
export const [AuthProvider, useAuthContext] = constate(useAuth);
