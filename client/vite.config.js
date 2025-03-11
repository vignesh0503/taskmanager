import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: import.meta.env.VITE_APP_BASE_URL,
        changeOrigin: true,
        secure: false,
        credentials: "include",
      },
    },
  },
});
