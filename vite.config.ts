import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import pluginEslint from '@nabla/vite-plugin-eslint';
import pluginTsconfigPaths from 'vite-tsconfig-paths';

const PROXY_BASE_URL = 'https://itu-dev-02f448e47ca5.herokuapp.com/';

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
      '/api': {
        target: `${PROXY_BASE_URL}/api`,
        changeOrigin: true,
        rewrite: (fullPath) => fullPath.replace('/api', ''),
      },
      '/auth': {
        target: `${PROXY_BASE_URL}/auth`,
        changeOrigin: true,
        rewrite: (fullPath) => fullPath.replace('/auth', ''),
      },
      '/users': {
        target: `${PROXY_BASE_URL}/users`,
        changeOrigin: true,
        rewrite: (fullPath) => fullPath.replace('/users', ''),
      },
      '/transactions': {
        target: `${PROXY_BASE_URL}/transactions`,
        changeOrigin: true,
        rewrite: (fullPath) => fullPath.replace('/transactions', ''),
      },
      '/appreciations': {
        target: `${PROXY_BASE_URL}/appreciations`,
        changeOrigin: true,
        rewrite: (fullPath) => fullPath.replace('/appreciations', ''),
      },
    },
  },
});
