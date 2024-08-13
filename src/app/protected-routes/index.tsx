import { useAuthContext } from "src/providers/auth";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  state: TYPES.UserState;
  children: ReactNode;
};

const ProtectedRoutes = ({ state, children }: Props) => {
  const { isAuthenticated, state: currentState } = useAuthContext();

  if (isAuthenticated && currentState !== state) {
    return <Navigate to="/home" />;
  }

  if (!isAuthenticated && currentState !== state) {
    return <Navigate to="/onboarding" />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
