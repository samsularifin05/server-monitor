import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vitejs.dev/config/
export default defineConfig(() => {
  const timestamp = new Date().getTime();

  return {
    plugins: [react(), tailwindcss()],
    optimizeDeps: {
      exclude: ["lucide-react"],
    },

    css: {
      modules: {
        localsConvention: "camelCase",
        generateScopedName: "[local]_[hash:base64:5]",
      },
    },
    build: {
      minify: "esbuild",
      emptyOutDir: true,
      outDir: "dist",
      sourcemap: false,
      cssCodeSplit: true,
      modulePreload: true,
      chunkSizeWarningLimit: 1000000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
          chunkFileNames: `assets/js/[hash]-${timestamp}.js`,
          entryFileNames: `assets/js/[hash]-${timestamp}.js`,
          assetFileNames: ({ name }) => {
            if (/\.(gif|jpe?g|png|svg|webp|avif)$/.test(name ?? "")) {
              // return `assets/images/[hash]-${timestamp}[extname]`;
              return `assets/images/${name}`;
            }
            if (/\.(mp3)$/.test(name ?? "")) {
              return `assets/mp3/${name}`;
            }
            if (/\.(ttf|woff2|svg)$/.test(name ?? "")) {
              // return `assets/font/[hash]-${timestamp}[extname]`;
              return `assets/font/${name}`;
            }
            if (/\.css$/.test(name ?? "")) {
              return `assets/css/[hash]-${timestamp}[extname]`;
            }
            return `assets/${name}`;
          },
        },
      },
    },
  };
});
