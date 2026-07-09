import { defineConfig } from "vite";

export default defineConfig({
  appType: "mpa",
  publicDir: false,
  build: {
    outDir: "dist",
    emptyOutDir: true
  },
  server: {
    port: 8001,
    strictPort: false
  }
});
