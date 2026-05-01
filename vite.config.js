import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  publicDir: "public",
  plugins: [viteCompression({ algorithm: "brotliCompress" })],
  server: {
    port: 5173,
    open: true,
  },
});
