import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";

import { GlobalPendingIndicator } from "@/components/global-pending-indicator";
import { Header } from "@/components/header";
import {
  ThemeSwitcherSafeHTML,
  ThemeSwitcherScript,
} from "@/components/theme-switcher";
import "./tailwind.css";
import { LinksFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import homeBuildings from "@/assets/homeBuildings.webp";
import { Footer } from "@/components/footer";
import { defaultProperties } from "../KV/properties";
import { defaultTestimonials } from "../KV/testimonials";

export async function loader({ context }: LoaderFunctionArgs) {
  const env = context.env;

  const checkProperties = await env.properties.get(defaultProperties[0].name);
  const testimonials = await env.testimonials.get(defaultTestimonials[0].name);
  if (testimonials === null) {
    console.log("testimonials are null");
    defaultTestimonials.map(async (data) => {
      await env.testimonials.put(data.name, JSON.stringify(data));
    });
  }
  if (checkProperties === null) {
    console.log("properties are null");
    defaultProperties.map(async (data) => {
      return await env.properties.put(data.name, JSON.stringify(data));
    });
  }

  return null;
}

function App({ children }: { children: React.ReactNode }) {
  return (
    <ThemeSwitcherSafeHTML lang="en">
      <head>
        <title>Real Estate Web Site</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ThemeSwitcherScript />
      </head>
      <body className={"bg-sgrey-8 text-white box-border"}>
        <GlobalPendingIndicator />
        <Header />
        {children}
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </ThemeSwitcherSafeHTML>
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
      <div className="container prose py-8">
        <h1>{status}</h1>
        <p>{message}</p>
      </div>
    </App>
  );
}
