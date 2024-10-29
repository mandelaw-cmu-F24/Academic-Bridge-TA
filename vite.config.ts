import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: process.env.NODE_ENV !== "production",
    rollupOptions: {
      external: [/\.test\.(ts|tsx)$/, /setupTests\.ts$/],
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          i18n: ["i18next", "react-i18next"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ["@testing-library/jest-dom"],
  },
});
