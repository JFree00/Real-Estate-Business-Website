import { AppLoadContext } from "@remix-run/cloudflare";

// biome-ignore lint/suspicious/noEmptyInterface: Fill this in with your own types for your use-case
// eslint-disable-next-line   @typescript-eslint/no-empty-object-type
export interface Env {}

export function getLoadContext(env: Env): AppLoadContext {
  return { env };
}
