// @flow
import { Route } from "../../.react-router/types/app/routes/+types/assets.$asset";

export const loader = async ({
  context,
  params,
  request,
}: Route.LoaderArgs) => {
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
      params.asset + "?" + (searchparams ? size[searchparams] : searchparams),
    );
    if (!image) {
      const fallback = await bucket.get(params.asset);
      if (!fallback) {
        return new Response("Not found", { status: 404 });
      }
      // @ts-expect-error - image.body is a ReadableStream
      return new Response(fallback.body, {
        headers: {
          "Content-Type":
            fallback.httpMetadata?.contentType ?? "application/octet-stream",
        },
      });
    } else {
      // @ts-expect-error - image.body is a ReadableStream
      return new Response(image.body, {
        headers: {
          "Content-Type":
            image.httpMetadata?.contentType ?? "application/octet-stream",
        },
      });
    }
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return new Response(`Something went wrong: ${e}`, { status: 400 });
  }
};
