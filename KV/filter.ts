type filterTypes = "L" | "PT" | "PR" | "PS" | "BY"; //abbreviations stored in the KV to reduce the total length (ex. "build_year: 1997" -> "BY-1997")
export type abbreviatedFilterKey = `${filterTypes}-${string}`;
export type nonAbbreviatedFilterKey = `${filterCategories}-${string}`;
export type filterCategories = //required props in propertyProps
  "property_type" | "location" | "build_year" | "price" | "size";
export type filteredData = Array<[abbreviatedFilterKey, string[]]>; //parsed cursor KV value
export type convertedFilter = Map<abbreviatedFilterKey, string[]>; //type clientFilters = [string, string[]];
type filterDataParams = {
  [key in filterCategories]: string | number;
} & {
  name: string;
};

export class FilterClass {
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
  static toCursor(data: filteredData): string {
    return JSON.stringify(data);
  }
  static fromCursor(cursor: string): filteredData {
    return JSON.parse(cursor);
  }
  static mapAllFilters(
    properties: filterDataParams[],
    filter?: filterCategories[],
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
        Object.entries(this.keys).forEach(([key, value]) => {
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
  static filteredResult(
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
  static toFiltersMapped(
    cursor: filteredData,
  ): Array<[filterCategories, string[]]> {
    const filtersArray = new Map<filterCategories, string[]>();
    cursor.forEach(([filterName]) => {
      const convertAbbreviation = this.expandAbbreviate(filterName);
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
