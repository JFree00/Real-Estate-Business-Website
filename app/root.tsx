import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "react-router";
import { Header } from "@/components/header";
import "./tailwind.css";
import { Footer } from "@/components/footer";
import * as React from "react";
import * as Sentry from "@sentry/react";
import { Route } from "./+types/root";

export const meta = ({ data }: Route.MetaArgs) => {
  return data?.sentryTrace && data?.sentryBaggage
    ? [
        {
          name: "sentry-trace",
          content: data.sentryTrace,
        },
        {
          name: "baggage",
          content: data.sentryBaggage,
        },
      ]
    : undefined;
};
export function loader() {
  const rootSpan =
    Sentry.getActiveSpan() ?? Sentry.startInactiveSpan({ name: "root" });
  const sentryTrace = Sentry.spanToBaggageHeader(rootSpan);
  const sentryBaggage = Sentry.spanToBaggageHeader(rootSpan);
  return { sentryTrace: sentryTrace, sentryBaggage: sentryBaggage };
}
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Real Estate Web Site</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={"box-border bg-sgrey-8 text-white"}>
        <Header />
        {children}
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  let status = 500;
  let message = "An unexpected error occurred.";
  if (isRouteErrorResponse(error)) {
    status = error.status;
    switch (error.status) {
      case 404:
        message = "Page Not Found";
        break;
    }
  } else {
    Sentry.captureException(error);
  }

  return (
    <div
      className={
        "mx-auto flex min-h-[25vw] flex-col gap-y-10 pt-20 text-center capitalize"
      }
    >
      <div>
        <h2 className={"text-8xl font-bold"}>{status}</h2>
        <h2 className={"text-5xl font-bold pt-10"}>{message}</h2>
      </div>
    </div>
  );
}
