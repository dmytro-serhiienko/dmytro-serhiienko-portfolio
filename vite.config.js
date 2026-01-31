import { glob } from "glob";
import { join } from "path";
import { defineConfig, loadEnv } from "vite";
import injectHTML from "vite-plugin-html-inject";
import FullReload from "vite-plugin-full-reload";
import SortCss from "postcss-sort-media-queries";

export default defineConfig(({ command, mode }) => {
  // Завантаження змінних оточення з папки src
  Object.assign(process.env, loadEnv(mode, join(process.cwd(), "src")));

  return {
    define: {
      [command === "serve" ? "global" : "_global"]: {},
    },
    // Налаштування базового шляху для GitHub Pages
    // При розробці (serve) використовується '/', при збірці (build) - назва репозиторію
    base: command === "build" ? "/dmytro-serhiienko-portfolio/" : "/",

    root: "src",
    publicDir: "../static",

    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync("./src/*.html"),
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
          entryFileNames: (chunkInfo) => {
            if (chunkInfo.name === "commonHelpers") {
              return "commonHelpers.js";
            }
            return "[name].js";
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith(".html")) {
              return "[name].[ext]";
            }
            return "assets/[name]-[hash][extname]";
          },
        },
      },
      outDir: "../dist",
      emptyOutDir: true,
    },

    plugins: [
      injectHTML(),
      FullReload(["./src/**/**.html"]),
      // Використання PostCSS плагіна через об'єкт конфігурації CSS
    ],
    css: {
      postcss: {
        plugins: [
          SortCss({
            sort: "mobile-first",
          }),
        ],
      },
    },
  };
});
