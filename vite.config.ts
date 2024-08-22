import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

const PROXY_BASE_URL = "https://itu-dev-02f448e47ca5.herokuapp.com/";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      // e.g. use TypeScript check
      typescript: true,
    }),
  ],
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
    },
  },
  server: {
    open: true,
    port: 3000,
    proxy: {
      // "/": {
      //   target: `${PROXY_BASE_URL}/`,
      //   changeOrigin: true,
      //   rewrite: (fullPath) => fullPath.replace("/", ""),
      // },
      "/api": {
        target: `${PROXY_BASE_URL}/api`,
        changeOrigin: true,
        rewrite: (fullPath) => fullPath.replace("/api", ""),
      },
    },
  },
});
