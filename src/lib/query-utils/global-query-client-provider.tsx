import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';
import { useQueryClientInstance } from './query-client';

const ENV = import.meta.env['VITE_APP_ENV'];

type GlobalQueryClientProviderProps = Readonly<{
  children: ReactNode;
}>;

export const GlobalQueryClientProvider = ({ children }: GlobalQueryClientProviderProps) => {
  const queryClient = useQueryClientInstance({ debug: false, development: ENV === 'development' });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      {children}
    </QueryClientProvider>
  );
};
