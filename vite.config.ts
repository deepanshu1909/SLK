import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { clientLandingPagesPlugin } from "./scripts/vite-client-lps";

export default defineConfig({
  plugins: [clientLandingPagesPlugin(), react(), tailwindcss(), tsconfigPaths()],
  server: {
    port: 5173,
    strictPort: false,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
