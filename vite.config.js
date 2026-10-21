import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  publicDir: "public",
  plugins: [viteCompression({ algorithm: "brotliCompress" })],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        work: resolve(__dirname, "work.html"),
        about: resolve(__dirname, "about.html"),
        contact: resolve(__dirname, "contact.html"),
        notFound: resolve(__dirname, "404.html"),
      },
    },
  },
  server: {
    port: 5173,
    open: true,
    watch: {
      usePolling: true,
      interval: 800,
    },
  },
});
