import type { KVNamespace } from "@cloudflare/workers-types";
import { AppLoadContext } from "react-router";

export interface Env {
  testimonials: KVNamespace;
  properties: KVNamespace;
  metadata: KVNamespace;
}
declare module "react-router" {
  interface AppLoadContext {
    env: Env;
  }
}
type getLoadContext = (args: {
  request: Request;
  context: { env: Env };
}) => AppLoadContext;

export function getLoadContext(env: Env): AppLoadContext {
  return { env };
}
