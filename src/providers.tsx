import { Outlet } from 'react-router-dom';
import { AuthProvider } from './app/auth';
import ThemeProvider from './providers/theme-provider';
import { ReactNode, Suspense } from 'react';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { QueryParamProvider } from 'use-query-params';
import { CssBaseline } from '@mui/material';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import { FetchItemsProvider } from './providers/hashtag-shade';
import { GlobalQueryClientProvider } from './lib/query-utils';
import { ToastContainer } from './components/toast';
import { NotificationsProvider, UserDetailsProvider } from './lib/hooks';
import { LoadScript } from '@react-google-maps/api';
import { FilterUsersProvider } from './providers/filter-provider';
import { CreateGroupProvider } from './providers/create-group-provider';

export const RoutesWrapper = () => {
  return (
    <QueryParamProvider
      adapter={ReactRouter6Adapter}
      options={{
        removeDefaultsFromUrl: true,
      }}
    >
      <ToastContainer />
      <Outlet />
    </QueryParamProvider>
  );
};

type Props = {
  children: ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <Suspense fallback={null}>
      {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
      <ThemeProvider>
        <CssBaseline />
        <HelmetProvider>
          <Helmet defaultTitle="Quiz app" titleTemplate="%s · Quiz app" />
          {/* // TODO */}
          <ErrorBoundary fallback={null}>
            <GlobalQueryClientProvider>
              <FetchItemsProvider>
                <AuthProvider>
                  <UserDetailsProvider>
                    <NotificationsProvider>
                      <FilterUsersProvider>
                        <CreateGroupProvider>
                          <LoadScript libraries={['places']} googleMapsApiKey="AIzaSyDsf_MC31bfKI8JwasA5WebPrCl2TDqoHc">
                            {children}
                          </LoadScript>
                        </CreateGroupProvider>
                      </FilterUsersProvider>
                    </NotificationsProvider>
                  </UserDetailsProvider>
                </AuthProvider>
              </FetchItemsProvider>
            </GlobalQueryClientProvider>
          </ErrorBoundary>
        </HelmetProvider>
      </ThemeProvider>
      {/* </LocalizationProvider> */}
    </Suspense>
  );
};
