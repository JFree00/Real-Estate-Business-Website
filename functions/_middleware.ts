import * as Sentry from "@sentry/cloudflare";
import { Env } from "../context";

export const onRequest = Sentry.sentryPagesPlugin<Env>((context) => ({
  dsn: context.env.SENTRY_BE_DSN,
  environment: context.env.ENVIRONMENT,
  tracesSampleRate: 1.0,
}));
