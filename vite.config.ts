import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 7000,
    strictPort: true,
    hmr: true,
    proxy: {
      "/api": {
        target: "http://localhost",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [vue(), vueJsx()],
});
