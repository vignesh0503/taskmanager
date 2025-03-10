import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target:
          process.env.NODE_ENV === "production"
            ? "https://task-manager-aoao.onrender.com"
            : "http://localhost:8800",
        changeOrigin: true,
        secure: false,
        credentials: "include",
      },
    },
  },
});
