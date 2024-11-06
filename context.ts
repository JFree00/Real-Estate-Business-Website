import { AppLoadContext } from "@remix-run/cloudflare";

// biome-ignore lint/suspicious/noEmptyInterface: Fill this in with your own types for your use-case

export interface Env {
  testimonials: KVNamespace;
  properties: KVNamespace;
}
declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    env: Env;
  }
}
declare module "@remix-run/cloudflare" {
  interface Future {
    v3_singleFetch: true;
  }
}
type getLoadContext = (args: {
  request: Request;
  context: { env: Env };
}) => AppLoadContext;

export function getLoadContext(env: Env): AppLoadContext {
  return { env };
}
