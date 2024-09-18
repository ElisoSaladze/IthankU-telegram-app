import { useRouteError } from 'react-router-dom';
import { ErrorView } from '~/components/error-view';

const ENV = import.meta.env['VITE_APP_ENV'];

export const RouterErrorBoundary = () => {
  const error = useRouteError() as { message?: string };

  if (error.message && ENV === 'development') {
    return <ErrorView message={error.message} />;
  }

  return <ErrorView message="Something went wrong, please try to refresh page" />;
};
