import loadable, { LoadableComponent } from '@loadable/component';
import promiseRetry from 'promise-retry';
import { Helmet } from 'react-helmet-async';
import { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom';
import { RouterErrorBoundary } from './router-error-boundary';

type Route = IndexRouteObject | NonIndexRouteObject;

type CreateRouteInput = {
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  factory: () => Promise<{ default: any }>;
  title?: string;
  children?: Array<Route>;
};

const createComponentFromFactory = <T extends () => JSX.Element = () => JSX.Element>(
  factory: () => Promise<{
    default: T;
  }>,
): LoadableComponent<T> =>
  loadable(() =>
    promiseRetry((retry) => factory().catch(retry), {
      retries: 5,
    }),
  );

export const createRoute = ({ path, factory, title, children }: CreateRouteInput): Route => {
  const Component = createComponentFromFactory(factory);

  return {
    path,
    element: (
      <>
        {title && <Helmet title={title} />}
        <Component />
      </>
    ),
    children,
    ErrorBoundary: RouterErrorBoundary,
  };
};
