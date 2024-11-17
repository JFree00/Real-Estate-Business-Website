const cursor = "filter_cursor";

//abbreviations stored in the KV to reduce the amount of data stored (ex. "build_year: 1997" -> "PT-1997")
type filterTypes = "L" | "PT" | "PR" | "PS" | "BY";
export type filterKey = `${filterTypes}-${string}`;
//add to merge into propertyProps
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

export class Filter {
  static readonly keys: { [key in filterCategories]: filterTypes } = {
    property_type: "PT",
    location: "L",
    build_year: "BY",
    price: "PR",
    size: "PS",
  } as const;

  static abbreviate(filter: filterCategories, value: string): filterKey {
    return `${Filter.keys[filter]}-${value}`;
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
}
