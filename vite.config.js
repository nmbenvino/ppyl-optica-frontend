import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

const newUrl = (url) => new URL(`./src/${url}`, import.meta.url);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@pages": fileURLToPath(newUrl("pages")),
      "@components": fileURLToPath(newUrl("components")),
      "@services": fileURLToPath(newUrl("services")),
    },
  },
});
