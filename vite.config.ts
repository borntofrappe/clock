import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import ViteServiceWorker from "./vite-plugin-service-worker";

export default defineConfig({
  plugins: [
    solid(),
    ViteServiceWorker({
      include: [
        ".",
        "icon.svg",
        "fonts/Inter-Regular-Subset.woff2",
        "fonts/Inter-SemiBold-Subset.woff2",
      ],
      importPrefix: "service-worker:",
      output: "service-worker.js",
    }),
  ],
});
