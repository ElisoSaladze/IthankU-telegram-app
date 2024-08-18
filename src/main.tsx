import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/auth.ts";
import ThemeProvider from "./providers/theme-provider.tsx";
import { GetUserDetailsProvider } from "./providers/user-data.ts";
import { FetchItemsProvider } from "./providers/hashtag-shade.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <FetchItemsProvider>
          <AuthProvider>
            <GetUserDetailsProvider>
              <ThemeProvider>
                <App />
              </ThemeProvider>
            </GetUserDetailsProvider>
          </AuthProvider>
        </FetchItemsProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
