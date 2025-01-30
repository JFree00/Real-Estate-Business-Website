// @flow
import * as React from "react";
import { Outlet, useLoaderData } from "react-router";
import { Filter } from "../../data/filter";
import { Route } from "./+types/properties";
import { Property } from "../../data/propertyTypings";

export const loader = async ({ context }: Route.LoaderArgs) => {
  const { metadata, properties } = context.env;

  const getCursor = async (cursorName = Filter.cursor) => {
    const existing = await metadata.get(cursorName);
    if (!existing || !Filter.validate(Filter.fromCursor(existing))) {
      console.warn("Cursor is either stale or invalid, creating new cursor");
      const propertieslist = await properties.list();
      const propertiesfromKV = await Promise.all(
        propertieslist.keys.map(async (key) => {
          try {
            const value = (await properties.get(key.name))!;
            const propertyMetadata = JSON.parse(value) as Property;
            propertyMetadata.metadata.name =
              propertyMetadata.metadata.name ?? propertyMetadata.name; //fail-safe
            return propertyMetadata.metadata;
          } catch (error) {
            console.error(`Failed to process property ${key.name}:`, error);
            return null;
          }
        }),
      );
      const results = propertiesfromKV.filter((p) => p !== null);
      const newcursor = Filter.toCursor(results);
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
