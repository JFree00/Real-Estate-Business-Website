// @flow
import * as React from "react";
import { Outlet, useLoaderData } from "react-router";
import { Filter } from "../../KV/filter";
import { defaultProperties } from "../../KV/properties";
import { Route } from "./+types/properties";

export const loader = async ({ context }: Route.LoaderArgs) => {
  const { metadata } = context.env;

  const getCursor = async (cursorName = Filter.cursor) => {
    const existing = await metadata.get(cursorName);
    if (!existing || !Filter.validate(Filter.fromCursor(existing))) {
      console.warn("Cursor is either stale or invalid, creating new cursor");
      const newcursor = Filter.toCursor(
        defaultProperties.map((p) => p.metadata),
      );
      await metadata.put(cursorName, JSON.stringify(newcursor));
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
