import { HydratedRouter } from "react-router/dom";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";

Sentry.init({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  dsn: import.meta.env.VITE_SENTRY_FE_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.captureConsoleIntegration(),
    Sentry.browserSessionIntegration(),
  ],
  environment: import.meta.env.DEV ? "development" : "production",
  tracesSampleRate: 1.0, //import.meta.env.DEV ? 1.0 : 0.5,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  tunnel: "/tunnel",
});

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
  );
});
