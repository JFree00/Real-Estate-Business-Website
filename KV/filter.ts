//cursor name in KV
import { propertyProps } from "./properties";
//abbreviations stored in the KV to reduce the amount of data stored (ex. "build_year: 1997" -> "PT-1997")
type filterTypes = "L" | "PT" | "PR" | "PS" | "BY";
export type filterKey = `${filterTypes}-${string}`;
//merge into propertyProps
export type filterCategories =
  | "property_type"
  | "location"
  | "build_year"
  | "price"
  | "size";
//parsed cursor KV value
type cursorType = Array<Array<string | Array<string>>>;

type clientFilters = [string, string[]];
export type convertedFilter = Map<filterKey, string[]>;

export class FilterClass {
  static readonly keys: { [key in filterCategories]: filterTypes } = {
    property_type: "PT",
    location: "L",
    build_year: "BY",
    price: "PR",
    size: "PS",
  } as const;
  cursor = "filter_cursor";

  static abbreviate(filter: filterCategories, value: string): filterKey {
    return `${this.keys[filter]}-${value}`;
  }
  static toCursor(data: cursorType): string {
    return JSON.stringify(data);
  }
  static fromCursor(cursor: string): cursorType {
    return JSON.parse(cursor);
  }
  static toClient(filter: convertedFilter): clientFilters[] {
    return Array.from(filter);
  }
  static filterArray(
    properties: propertyProps[],
    filter?: Array<filterCategories>,
  ): convertedFilter {
    const filterValues = new Map<filterKey, string[]>();
    if (filter) {
      properties.forEach((property) => {
        filter.forEach((f) => {
          const currentFilter = filterValues.get(
            FilterClass.abbreviate(f, property[f].toString()),
          );
          filterValues.set(FilterClass.abbreviate(f, property[f].toString()), [
            ...(currentFilter ? currentFilter : []),
            property.name,
          ]);
        });
      });
    } else {
      properties.forEach((property) => {
        Object.entries(FilterClass.keys).forEach(([key, value]) => {
          const currentFilter = filterValues.get(
            `${value}-${property[key as filterCategories].toString()}`,
          );
          filterValues.set(
            `${value}-${property[key as filterCategories].toString()}`,
            [...(currentFilter ? currentFilter : []), property.name],
          );
        });
      });
    }
    return new Map([...filterValues.entries()].sort());
  }
}
