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
export type filteredData = Array<[filterKey, string[]]>;

//type clientFilters = [string, string[]];
export type convertedFilter = Map<filterKey, string[]>;

export class FilterClass {
  static readonly keys: { [key in filterCategories]: filterTypes } = {
    property_type: "PT",
    location: "L",
    build_year: "BY",
    price: "PR",
    size: "PS",
  } as const;
  static readonly cursor: string = "filter_cursor" as const;

  static abbreviate(filter: filterCategories, value: string): filterKey {
    return `${this.keys[filter]}-${value}`;
  }
  static undoAbbreviate(abbreviated: filterKey): [filterCategories, string[]] {
    const [key, value] = abbreviated.split("-");
    return [
      Object.keys(this.keys).find(
        (k) => this.keys[k as filterCategories] === key,
      ) as filterCategories,
      [value],
    ];
  }
  static toCursor(data: filteredData): string {
    return JSON.stringify(data);
  }
  static fromCursor(cursor: string): filteredData {
    return JSON.parse(cursor);
  }
  static mapAllFilters(
    properties: propertyProps[],
    filter?: Array<filterCategories>,
  ): filteredData {
    const filterValues = new Map() as convertedFilter;
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
    return Array.from(filterValues).sort();
  }
  static filterData(cursor: filteredData, filters: Array<filterKey> | null) {
    //console.log(cursor);
    if (!filters) return cursor;
    const dataIndexes = new Array<string | null>();
    filters.map((f) => {
      const descendantIndexes = new Array<string>();
      cursor.forEach(([key, value]) => {
        if (key === f) {
          value.forEach((v) => {
            descendantIndexes.push(v);
          });
        }
      });
      if (dataIndexes.length !== 0) {
        dataIndexes.forEach((data, index) => {
          if (data !== null && !descendantIndexes.includes(data)) {
            dataIndexes[index] = null;
          }
        });
      } else dataIndexes.push(...descendantIndexes);
    });
    return dataIndexes.filter((data) => data);
  }
  static toFiltersMapped(
    cursor: filteredData,
  ): Array<[filterCategories, string[]]> {
    const filtersArray = new Map<filterCategories, string[]>();
    cursor.forEach(([filterName]) => {
      const convertAbbreviation = this.undoAbbreviate(filterName);
      if (!filtersArray.has(convertAbbreviation[0])) {
        filtersArray.set(convertAbbreviation[0], convertAbbreviation[1]);
      } else {
        filtersArray.set(convertAbbreviation[0], [
          ...filtersArray.get(convertAbbreviation[0])!,
          ...convertAbbreviation[1],
        ]);
      }
    });
    return Array.from(filtersArray);
  }
}
