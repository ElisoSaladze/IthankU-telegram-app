import { match } from 'ts-pattern';
import { AuthApp } from './auth-app';
import { UnauthApp } from './unauth-app';
import { useAuth } from '../auth/use-auth';
import { Progress } from '~/components/progress';

export const AuthSwitch = () => {
  const { user } = useAuth();

  console.log({ user });

  return match(user)
    .with({ state: 'loading' }, () => <Progress centered />)
    .with({ state: 'authenticated' }, () => <AuthApp />)
    .otherwise(() => <UnauthApp />);
};
