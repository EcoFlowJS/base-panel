import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/auth",
  server: {
    open: true,
    port: 3000,
    proxy: {
      "/admin": {
        target: "http://localhost:3001/",
        changeOrigin: true,
      },
      "/editor/flow": {
        target: "http://localhost:3002/",
        changeOrigin: true,
      },
      "/editor/schema": {
        target: "http://localhost:3003/",
        changeOrigin: true,
      },
    },
  },
});
