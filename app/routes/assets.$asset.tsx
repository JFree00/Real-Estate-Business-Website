// @flow
import { Route } from "../../.react-router/types/app/routes/+types/assets.$asset";
import { HeadersFunction } from "react-router";

export const headers: HeadersFunction = ({
  loaderHeaders,
}: Route.HeadersArgs) => ({
  "Cache-Control": loaderHeaders.get("Cache-Control") ?? "",
});
import * as Sentry from "@sentry/cloudflare";

export const loader = async ({
  context,
  params,
  request,
}: Route.LoaderArgs) => {
  return await Sentry.startSpanManual(
    {
      name: "R2 Request",
    },
    async (span) => {
      const bucket = context.env.bucket;
      const url = new URL(request.url);
      const size: Record<string, string> = {
        s: "small",
        m: "medium",
        l: "large",
      };
      const searchparams = url.searchParams.get("size");
      try {
        const image = await bucket.get(
          params.asset +
            "?" +
            (searchparams
              ? (size[searchparams] ?? searchparams.split("?")[0])
              : ""),
        );
        if (import.meta.env.DEV) {
          const image = await fetch("https://picsum.photos/1000");
          return new Response(image.body, {
            headers: {
              ...image.headers,
              "Content-Type": image.headers.get("Content-Type") ?? "image/png",
            },
          });
        }
        if (!image) {
          const fallback = await bucket.get(params.asset);
          if (!fallback) {
            return new Response("Not found", { status: 404 });
          }
          // @ts-expect-error - image.body is a ReadableStream
          return new Response(fallback.body, {
            headers: {
              "Content-Type": fallback.httpMetadata?.contentType ?? "image/png",
              "Cache-Control": `max-age=${context.env.CACHETTL}, s-maxage=86400`,
            },
          });
        } else {
          // @ts-expect-error - image.body is a ReadableStream
          return new Response(image.body, {
            headers: {
              "Content-Type": image.httpMetadata?.contentType ?? "image/webp",
              "Cache-Control": `max-age=${context.env.CACHETTL}, s-maxage=86400`,
            },
          });
        }
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return new Response(`Something went wrong: ${e}`, { status: 400 });
      } finally {
        span.end();
      }
    },
  );
};
