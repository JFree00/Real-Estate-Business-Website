import type { KVNamespace } from "@cloudflare/workers-types";
import { AppLoadContext } from "react-router";
import { R2Bucket } from "@cloudflare/workers-types/2023-07-01/index";

export interface Env {
  testimonials: KVNamespace;
  properties: KVNamespace;
  metadata: KVNamespace;
  images: KVNamespace;
  bucket: R2Bucket;
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
