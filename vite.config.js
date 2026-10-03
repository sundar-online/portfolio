import { resolve } from "path";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  publicDir: "public",
  plugins: [viteCompression({ algorithm: "brotliCompress" })],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        work: resolve(__dirname, "work.html"),
        contact: resolve(__dirname, "contact.html"),
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
