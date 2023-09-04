import path from "path"
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, loadEnv } from "vite";
import svgrPlugin from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

const cherryPickedKeys = [
  "NODE_ENV",
  "VITE_CLERK_PUBLISHABLE_KEY",
];

/**
 * @type {import('vite').UserConfig}
 */
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const processEnv = {};
  cherryPickedKeys.forEach(key => processEnv[key] = env[key]);

  return {
    define: {
      'process.env': processEnv
    },
    plugins: [
      react(),
      tsconfigPaths(),
      svgrPlugin(),
      visualizer(),
    ],
    css: {
      modules: {
        localsConvention: "camelCaseOnly",
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 5000,
    },
  }
});
