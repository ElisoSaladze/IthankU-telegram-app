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
import { FetchItemsProvider } from './providers/hashtag-shade';
import { GlobalQueryClientProvider } from './lib/query-utils';
import { ToastContainer } from './components/toast';
import { NotificationsProvider, UserDetailsProvider } from './lib/hooks';
import { LoadScript } from '@react-google-maps/api';
import { FilterUsersProvider } from './providers/filter-provider';
import { CreateGroupProvider } from './providers/create-group-provider';
import { Progress } from './components/progress';
import * as Sentry from '@sentry/react';
import { ErrorView } from './components/error-view';

const ENV = import.meta.env['VITE_APP_ENV'];

Sentry.init({
  dsn: 'https://d73775e08a7bc5b580b2ea9760aecf86@o572825.ingest.us.sentry.io/4507972716855296',
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  tracesSampleRate: 1.0,
  environment: ENV,
  // enabled: ENV !== 'development',
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const errorFallback: Sentry.FallbackRender = (errorData) => {
  const error = errorData.error as Error;

  return <ErrorView message={error.message} />;
};

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
    <Sentry.ErrorBoundary {...(ENV === 'development' ? { fallback: errorFallback } : { showDialog: true })}>
      <Suspense fallback={<Progress centered />}>
        <ThemeProvider>
          <CssBaseline />
          <HelmetProvider>
            <Helmet defaultTitle="Quiz app" titleTemplate="%s · Quiz app" />
            <GlobalQueryClientProvider>
              <AuthProvider>
                <FilterUsersProvider>
                  <FetchItemsProvider>
                    <UserDetailsProvider>
                      <NotificationsProvider>
                        <CreateGroupProvider>
                          <LoadScript libraries={['places']} googleMapsApiKey="AIzaSyDsf_MC31bfKI8JwasA5WebPrCl2TDqoHc">
                            {children}
                          </LoadScript>
                        </CreateGroupProvider>
                      </NotificationsProvider>
                    </UserDetailsProvider>
                  </FetchItemsProvider>
                </FilterUsersProvider>
              </AuthProvider>
            </GlobalQueryClientProvider>
          </HelmetProvider>
        </ThemeProvider>
      </Suspense>
    </Sentry.ErrorBoundary>
  );
};
