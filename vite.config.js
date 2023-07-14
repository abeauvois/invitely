import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import env from "vite-plugin-env-compatible";
import svgrPlugin from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * @type {import('vite').UserConfig}
 */
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgrPlugin(),
    visualizer(),
    env({ prefix: "SUPERVAN" }),
  ],
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
  server: {
    port: 9002,
  },
});
