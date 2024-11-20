// @flow
import * as React from "react";
import { Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Filter } from "../../KV/filter";
import { defaultProperties } from "../../KV/properties";

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const { metadata } = context.env;

  const getCursor = async (cursorName = Filter.cursor) => {
    const existing = await metadata.get(cursorName).catch((error) => {
      throw new Response(error);
    });
    if (!existing || !Filter.validate(Filter.fromCursor(existing))) {
      console.warn("Cursor is either stale or invalid, creating new cursor");
      const newcursor = Filter.withAnyFilter(defaultProperties);
      metadata.put(cursorName, JSON.stringify(newcursor)).catch((error) => {
        throw new Response(error);
      });
      return newcursor;
    }
    return Filter.fromCursor(existing);
  };
  const cursor = await getCursor();
  return { filters: Filter.onlyFilterNames(cursor) };
};
export default function Properties() {
  const { filters } = useLoaderData<typeof loader>();
  return <Outlet context={filters} />;
}
