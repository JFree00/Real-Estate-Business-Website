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
import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Footer } from "@/components/footer";
import { defaultProperties } from "../KV/properties";
import { defaultTestimonials } from "../KV/testimonials";
import { Env } from "../context";

export async function loader({ context }: LoaderFunctionArgs) {
  const env = context.env;

  const checkIfNamespacePopulated = async (
    index: number,
    namespace: keyof Env,
    checkFor: Array<{ name: string }>,
  ) => await env[namespace].get(checkFor[index].name);
  if (
    !(await checkIfNamespacePopulated(
      0,
      "testimonials",
      defaultTestimonials,
    )) ||
    !(await checkIfNamespacePopulated(1, "testimonials", defaultTestimonials))
  ) {
    console.warn("testimonials not populated");
    defaultTestimonials.map((data) => {
      env.testimonials.put(data.name, "", {
        metadata: JSON.stringify(data),
      });
    });
  }
  if (
    !(await checkIfNamespacePopulated(0, "properties", defaultProperties)) ||
    !(await checkIfNamespacePopulated(1, "properties", defaultProperties))
  ) {
    console.warn("properties not populated");
    defaultProperties.forEach((data) => {
      env.properties.put(data.name, "", {
        metadata: JSON.stringify(data),
      });
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
