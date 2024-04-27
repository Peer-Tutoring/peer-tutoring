import path from "path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react-swc";

import Unfonts from "unplugin-fonts/vite";

export default defineConfig({
  plugins: [
    react(),
    Unfonts({
      google: {
        families: [
          {
            name: "Rubik",
            styles: "wght@300;400;500;600;700;800;900",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
