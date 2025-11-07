import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // SSR 페이지(타임리프)만 백엔드로 전달
      "/ssr": { target: "http://localhost:9999", changeOrigin: true },
    },
  },
});
