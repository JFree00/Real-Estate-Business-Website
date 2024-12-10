// @flow
import * as React from "react";
import { Route } from "./+types/properties.$property";
import { isRouteErrorResponse, useRouteError } from "react-router";
import { propertyProps } from "../../KV/properties";

export const loader = async ({ context, params }: Route.LoaderArgs) => {
  const { properties } = context.env;
  const property = await properties
    .getWithMetadata(params.property)
    .catch(() => {
      throw new Response(`Something went wrong`, { status: 502 });
    });
  if (!property.metadata || !(property.metadata as string).length) {
    if (property.value)
      return {
        property: JSON.parse(property.value) as propertyProps,
      };
    throw new Response(`Property not found`, { status: 404 });
  }
  return { property: JSON.parse(property.metadata as string) as propertyProps };
};
export default function Property({ loaderData }: Route.ComponentProps) {
  const { property } = loaderData;
  return <div></div>;
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <div></div>;
  }
  return <div>Something went wrong!</div>;
}
