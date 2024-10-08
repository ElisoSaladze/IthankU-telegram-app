import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import pluginEslint from '@nabla/vite-plugin-eslint';
import pluginTsconfigPaths from 'vite-tsconfig-paths';

// const PROXY_BASE_URL = 'https://itu-dev-02f448e47ca5.herokuapp.com/';
const PROXY_BASE_URL = 'https://itu-21eea052177b.herokuapp.com/';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      /**
       * Use the `@emotion/react` and `@emotion/babel-plugin` options if you use emotion as your style engine. For example, emotion is the default engine in MUI.
       */
      jsxImportSource: '@emotion/react',
      jsxRuntime: 'automatic',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    checker({
      // e.g. use TypeScript check
      typescript: true,
    }),
    pluginTsconfigPaths(),
    pluginEslint(),
  ],
  resolve: {
    alias: {
      src: '/src',
      components: '/src/components',
    },
  },
  server: {
    open: true,
    port: 3000,
    proxy: {
      '/api/v1': {
        target: `${PROXY_BASE_URL}/api/v1`,
        changeOrigin: true,
        rewrite: (fullPath) => fullPath.replace('/api/v1', ''),
      },
    },
  },
});
