import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RoutesWrapper } from 'src/providers';
import { AppLayout } from '../layouts';
import { wrapCreateBrowserRouter } from '@sentry/react';
import { authRoutes, paths } from '../routes';

const sentryCreateBrowserRouter = wrapCreateBrowserRouter(createBrowserRouter);

export const AuthApp = () => {
  const router = sentryCreateBrowserRouter([
    {
      path: '/',
      Component() {
        return (
          <AppLayout>
            <RoutesWrapper />
          </AppLayout>
        );
      },
      children: [
        ...authRoutes,
        {
          path: '*',
          element: <Navigate replace to={paths.home} />,
        },
        {
          index: true,
          element: <Navigate replace to={paths.home} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
