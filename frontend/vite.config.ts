import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

const excludeDeps = [
  "@tanstack/react-start",
  "@tanstack/react-start-client",
  "@tanstack/react-start-server",
  "@tanstack/start-client-core",
  "@tanstack/start-server-core",
];

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tanstackStart({
      server: { entry: "src/server.ts" },
    }),
    react(),
    tailwindcss(),
    cloudflare(),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  optimizeDeps: {
    exclude: excludeDeps,
  },
  ssr: {
    optimizeDeps: {
      exclude: excludeDeps,
    },
  },
  environments: {
    client: {
      optimizeDeps: {
        exclude: excludeDeps,
      },
    },
    ssr: {
      optimizeDeps: {
        exclude: excludeDeps,
      },
    },
    tanstack_start_app: {
      optimizeDeps: {
        exclude: excludeDeps,
      },
    },
  },
});
