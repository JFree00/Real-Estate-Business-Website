import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError
} from "react-router";

import { GlobalPendingIndicator } from "@/components/global-pending-indicator";
import { Header } from "@/components/header";
import "./tailwind.css";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import * as React from "react";

function App({ children }: { children: React.ReactNode }) {
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
        <GlobalPendingIndicator />
        <Header />
        {children}
        <Toaster />
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <App>
      <Outlet />
    </App>
  );
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
    console.error(error);
  }

  return (
    <App>
      <div className={"prose container py-8"}>
        <h1>{status}</h1>
        <p>{message}</p>
      </div>
    </App>
  );
}
