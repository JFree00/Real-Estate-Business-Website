/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import type { AppLoadContext, EntryContext } from "react-router";
import { ServerRouter } from "react-router";
import { isbot } from "isbot";
import ReactDOM from "react-dom/server";
import * as Sentry from "@sentry/cloudflare";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext,
  // This is ignored so we can keep it in the template for visibility.  Feel
  // free to delete this parameter in your app if you're not using it!
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadContext: AppLoadContext,
) {
  let status = responseStatusCode;
  responseHeaders.set("Content-Type", "text/html; charset=utf-8");
  responseHeaders.append("Access-Control-Allow-Headers", "sentry-trace");
  responseHeaders.append("Access-Control-Allow-Headers", "baggage");
  const body = await ReactDOM.renderToReadableStream(
    <ServerRouter context={reactRouterContext} url={request.url} />,
    {
      signal: request.signal,
      onError(error: unknown) {
        Sentry.captureException(error);
        // Log streaming rendering errors from inside the shell
        console.error(error);
        status = 500;
      },
    },
  );

  if (isbot(request.headers.get("user-agent") ?? "")) {
    await body.allReady;
  }

  return new Response(body, {
    headers: responseHeaders,
    status,
  });
}
