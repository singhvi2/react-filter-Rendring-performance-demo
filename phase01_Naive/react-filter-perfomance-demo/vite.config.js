import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite"; // 1. Import it

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Directs Vite to use React's profiling package in production builds
      "react-dom/client": "react-dom/profiling",
    },
  },
});
