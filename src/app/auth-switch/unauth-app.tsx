import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RoutesWrapper } from 'src/providers';
import { paths, unauthRoutes } from '../routes';
import { wrapCreateBrowserRouter } from '@sentry/react';

const sentryCreateBrowserRouter = wrapCreateBrowserRouter(createBrowserRouter);

export const UnauthApp = () => {
  const router = sentryCreateBrowserRouter([
    {
      path: '/',
      Component() {
        return <RoutesWrapper />;
      },
      children: [
        ...unauthRoutes,
        {
          path: '*',
          element: <Navigate replace to={paths.onboarding} />,
        },
        {
          index: true,
          element: <Navigate replace to={paths.onboarding} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
