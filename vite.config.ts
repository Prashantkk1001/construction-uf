import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
   base: './',   // ✅ Malformed path fix (/admin-login/localhost)
  plugins: [
    react(), 
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "::",
    port: 8080,
     hmr: {
      host: 'localhost'
    }   // ✅ HMR ping error fix
  },
   build: {
    outDir: 'dist',
    sourcemap: mode === 'development'
  }, 
  preview: {
    port: 4173
  }
}));