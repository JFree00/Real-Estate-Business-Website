//cloudflares free tier limit is 1k list() calls per day, and 100k read() calls per day (1:100 ratio), and will error if exceeded
//using the two provided functions, the only way to provide filter options to the user would be to list() the entire namespace everytime
//the options are needed, and everytime the user applies filters, which with so many list() calls, can quickly exceed the free tier limits
//approx. (1 initial list() call to display filter options) + (1 list() whenever the filters are changed)
// (1 + (1 * number of filters))
//using this class, all lists calls are replaced with get calls, thus no list() calls are needed

//TODO implement multiple filter cursors
type filterTypes = "L" | "PT" | "PR" | "S" | "BY"; //abbreviations stored in the cursor to reduce the total length (ex. "build_year: 1997" -> "BY-1997")
export type filterCategories = //required props in propertyProps
  "property_type" | "location" | "build_year" | "price" | "size";
export type abbreviatedFilterKey = `${filterTypes}-${string}`;
export type nonAbbreviatedFilterKey = `${filterCategories}-${string}`;
export type filteredData = [abbreviatedFilterKey, string[]][]; //parsed cursor KV value
export type convertedFilter = Map<abbreviatedFilterKey, string[]>;
export type rawFilterCursor = [filterCategories, string[]][];
export type filterDataParams = Record<filterCategories, string | number> &
  namedUnknown;
export interface namedUnknown {
  name: string;
  [key: string]: unknown;
} //base interface extended by all data stored in KV

export class Filter {
  static readonly keys: Record<filterCategories, filterTypes> = {
    property_type: "PT",
    location: "L",
    build_year: "BY",
    price: "PR",
    size: "S",
  } as const;
  static readonly CURSOR: string = "filter_cursor" as const;

  /**
   * Abbreviate a filter key
   */
  static abbreviate( //client -> server
    nonAbbreviated: nonAbbreviatedFilterKey,
  ): abbreviatedFilterKey;
  static abbreviate(key: filterCategories, value: string): abbreviatedFilterKey; //server -> KV
  static abbreviate(filter: string, value?: string): abbreviatedFilterKey {
    if (!value) {
      const split = filter.split("-");
      return this.keys[split[0] as filterCategories].concat(
        "-",
        split[1],
      ) as abbreviatedFilterKey;
    }
    return `${this.keys[filter as filterCategories]}-${value}`;
  }
  /**
   * Expand an abbreviated filter key
   */
  static expandAbbreviate(
    abbreviated: abbreviatedFilterKey,
  ): [filterCategories, string] {
    const [key, value] = abbreviated.split("-");
    return [
      Object.keys(this.keys).find(
        (k) => this.keys[k as filterCategories] === key,
      ) as filterCategories,
      value,
    ];
  }
  /**
   * simple parser for the cursor
   */
  static fromCursor(cursor: string): filteredData {
    return JSON.parse(cursor) as filteredData;
  }

  /**
   * Convert a filteredData array to a cursor string
   */
  static toCursor<P extends Partial<filterCategories>>(
    data: Pick<filterDataParams, P | "name">[],
    filter?: P[],
  ): filteredData {
    const filterValues: convertedFilter = new Map();
    const addFilterValue = (key: abbreviatedFilterKey, name: string) => {
      const currentFilter = filterValues.get(key) ?? [];
      filterValues.set(key, [...currentFilter, name]);
    };
    data.forEach((property) => {
      if (filter) {
        filter.forEach((f) => {
          addFilterValue(
            this.abbreviate(f, property[f].toString()),
            property.name,
          );
        });
      } else {
        Object.entries(this.keys).forEach(([key, value]) => {
          addFilterValue(`${value}-${property[key as P]}`, property.name);
        });
      }
    });
    return Array.from(filterValues).sort();
  }
  /** Returns all data matching the filter */
  static anyWithFilter(
    cursor: filteredData,
    filter: abbreviatedFilterKey[],
  ): string[] {
    const filterValues = new Set<string>();
    filter.forEach((key) => {
      cursor
        .filter(([k]) => k === key)
        .forEach(([, value]) => {
          value.forEach((v) => {
            filterValues.add(v);
          });
        });
    });
    return Array.from(filterValues).sort();
  }
  /** Return an array of KV names whose data fits every filter*/
  static withEveryFilter(
    cursor: filteredData,
    filters: abbreviatedFilterKey[],
  ) {
    const dataIndexes = new Map<filterCategories, string[]>();
    filters.forEach((filter) => {
      const abbrev = this.expandAbbreviate(filter)[0];
      const addToIndex = (value: string) => {
        const current = dataIndexes.get(abbrev) ?? [];
        dataIndexes.set(abbrev, [...current, value]);
      };
      const descendantIndexes = new Set<string>();
      cursor.forEach(([key, value]) => {
        if (key === filter) {
          value.forEach((v) => descendantIndexes.add(v));
        }
      });
      descendantIndexes.forEach((v) => {
        addToIndex(v);
      });
    });
    return Array.from(dataIndexes.values()).reduce((a, b) =>
      a.filter((c) => b.includes(c)),
    );
  }
  /** Return an array of filter categories and their subcategories for popover*/
  static onlyFilterNames(cursor: filteredData): rawFilterCursor {
    const filtersArray = new Map<filterCategories, string[]>();
    cursor.forEach(([filterName]) => {
      const [filterCategory, subcategories] = this.expandAbbreviate(filterName);
      const existingSubcategories = filtersArray.get(filterCategory) ?? [];
      filtersArray.set(filterCategory, [
        ...existingSubcategories,
        subcategories,
      ]);
    });
    return Array.from(filtersArray);
  }
  /** Check if all keys exist */
  static validate(cursor: filteredData): boolean {
    return cursor.every(([key]) => {
      return Object.keys(this.keys).includes(this.expandAbbreviate(key)[0]);
    });
  }
}
