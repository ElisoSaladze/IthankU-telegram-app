import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RoutesWrapper } from 'src/providers';
import { AppLayout } from '../layouts';
import { authRoutes, paths } from '../routes';

export const AuthApp = () => {
  const router = createBrowserRouter([
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
