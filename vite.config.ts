import { defineConfig } from "vitest/config";
import { reactRouter } from "@react-router/dev/vite";
import envOnly from "vite-env-only";
import tsconfigPaths from "vite-tsconfig-paths";
import { cloudflareDevProxy } from "@react-router/dev/vite/cloudflare";
import { Env } from "./context";
import { CfProperties } from "@cloudflare/workers-types";
import vitePluginSvgr from "vite-plugin-svgr";
import { sentryVitePlugin } from "@sentry/vite-plugin";
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [
    envOnly(),
    tsconfigPaths(),
    cloudflareDevProxy<Env, CfProperties>({
      getLoadContext: async ({
        context: {
          cloudflare: { env },
        },
      }) => {
        const { getLoadContext } = await import("./context");
        return getLoadContext(env);
      },
    }),
    reactRouter(),
    vitePluginSvgr({
      svgrOptions: {
        prettier: true,
        replaceAttrValues: { white: "fill-inherit" },
      },
    }),
    process.env.VITEST
      ? null
      : sentryVitePlugin({
          org: process.env.SENTRY_ORG,
          project: process.env.SENTRY_PROJECT,
          authToken: process.env.SENTRY_ORG_TOKEN,
        }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      enabled: true,
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
