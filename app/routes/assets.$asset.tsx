// @flow
import { Route } from "../../.react-router/types/app/routes/+types/assets.$asset";

export const loader = async ({ context, params }: Route.LoaderArgs) => {
  const bucket = context.env.bucket;
  try {
    const image = await bucket.get(params.asset);
    if (!image) {
      return new Response("Not found", { status: 404 });
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
