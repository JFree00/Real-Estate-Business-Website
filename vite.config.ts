import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import envOnly from "vite-env-only";
import tsconfigPaths from "vite-tsconfig-paths";
import { cloudflareDevProxy } from "@react-router/dev/vite/cloudflare";
import { Env } from "./context";
import { CfProperties } from "@cloudflare/workers-types";
import vitePluginSvgr from "vite-plugin-svgr";

export default defineConfig({
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
  ],
});
