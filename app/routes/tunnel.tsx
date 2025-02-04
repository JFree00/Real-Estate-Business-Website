import { Route } from "../../.react-router/types/app/routes/+types/tunnel";

export const action = async ({ request, context }: Route.LoaderArgs) => {
  try {
    const envelopeBytes = await request.arrayBuffer();
    const envelope = new TextDecoder().decode(envelopeBytes);
    const piece = envelope.split("\n")[0];
    const header = JSON.parse(piece) as { dsn: string };
    const dsn = new URL(header.dsn);
    const project_id = dsn.pathname?.replace("/", "");
    if (dsn.hostname !== context.env.SENTRY_FE_HOST) {
      throw new Error(`Invalid sentry hostname: ${dsn.hostname}`);
    }

    if (!project_id || context.env.SENTRY_PROJECT_ID !== project_id) {
      throw new Error(`Invalid sentry project id: ${project_id}`);
    }

    const upstream_sentry_url = `https://${context.env.SENTRY_FE_HOST}/api/${context.env.SENTRY_PROJECT_ID}/envelope/`;
    await fetch(upstream_sentry_url, {
      method: "POST",
      body: envelopeBytes,
    });

    return Response.json({ success: true });
  } catch (e) {
    console.error("error tunneling to sentry", e);
    return Response.json(
      { error: "error tunneling to sentry" },
      { status: 500 },
    );
  }
};
