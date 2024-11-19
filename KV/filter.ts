//cloud flares free tier limit is 1k list() calls per day, and 100k read() calls per day (1:100 ratio), and will error if exceeded
//using these two functions, the only way to provide filter options to the user would be to list() the entire namespace everytime
//the options are needed, and everytime the user applies filters, which with so many list() calls, can quickly exceed the free tier limits
//approx. (1 initial list() call for filter options) + (1 list() whenever the filters are changed) equivalent to 200 get() calls as per ratio
//using this class, no list() calls are needed, and are both replaced with get() calls

//TODO implement multiple filter cursors
type filterTypes = "L" | "PT" | "PR" | "PS" | "BY"; //abbreviations stored in the cursor to reduce the total length (ex. "build_year: 1997" -> "BY-1997")
export type filterCategories = //required props in propertyProps
  "property_type" | "location" | "build_year" | "price" | "size";
export type abbreviatedFilterKey = `${filterTypes}-${string}`;
export type nonAbbreviatedFilterKey = `${filterCategories}-${string}`;
export type filteredData = Array<[abbreviatedFilterKey, string[]]>; //parsed cursor KV value
export type convertedFilter = Map<abbreviatedFilterKey, string[]>;
type filterDataParams = {
  [key in filterCategories]: string | number;
} & {
  name: string;
};

export class Filter {
  static readonly keys: { [key in filterCategories]: filterTypes } = {
    property_type: "PT",
    location: "L",
    build_year: "BY",
    price: "PR",
    size: "PS",
  } as const;
  static readonly cursor: string = "filter_cursor" as const;

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

  static expandAbbreviate(
    abbreviated: abbreviatedFilterKey,
  ): [filterCategories, string[]] {
    const [key, value] = abbreviated.split("-");
    return [
      Object.keys(this.keys).find(
        (k) => this.keys[k as filterCategories] === key,
      ) as filterCategories,
      [value],
    ];
  }
  static fromCursor(cursor: string): filteredData {
    return JSON.parse(cursor);
  }
  /** Assign all data values to their respective filter keys {@link filterCategories}
   * @param data Any data extending {@link filterDataParams}
   * @param filter Only return specified filters
   */
  static withAnyFilter(
    data: filterDataParams[],
    filter?: filterCategories[],
  ): filteredData {
    const filterValues: convertedFilter = new Map();
    const addFilterValue = (key: abbreviatedFilterKey, name: string) => {
      const currentFilter = filterValues.get(key) || [];
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
          addFilterValue(
            `${value}-${property[key as filterCategories]}`,
            property.name,
          );
        });
      }
    });
    return Array.from(filterValues).sort();
  }
  /** Return an array of KV names whose data fits every filter*/
  static withEveryFilter(
    cursor: filteredData,
    filters: Array<abbreviatedFilterKey>,
  ) {
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
    return dataIndexes.filter((data) => data) as string[];
  }
  /** Return an array of filter categories and their subcategories for popover*/
  static onlyFilterNames(
    cursor: filteredData,
  ): Array<[filterCategories, string[]]> {
    const filtersArray = new Map<filterCategories, string[]>();
    cursor.forEach(([filterName]) => {
      const [filterCategory, subcategories] = this.expandAbbreviate(filterName);
      const existingSubcategories = filtersArray.get(filterCategory) || [];
      filtersArray.set(filterCategory, [
        ...existingSubcategories,
        ...subcategories,
      ]);
    });
    return Array.from(filtersArray);
  }
}
