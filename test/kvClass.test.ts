import { test } from "vitest";
import {
  convertedFilter,
  Filter,
  filterCategories,
  filterKey,
} from "../KV/filter";
import { defaultProperties, propertyProps } from "../KV/properties";
//add to Filter class
function filterArray(
  properties: propertyProps[],
  filter?: Array<filterCategories>,
): convertedFilter {
  const filterValues = new Map<filterKey, string[]>();
  if (filter) {
    properties.forEach((property) => {
      filter.forEach((f) => {
        const currentFilter = filterValues.get(
          Filter.abbreviate(f, property[f].toString()),
        );
        filterValues.set(Filter.abbreviate(f, property[f].toString()), [
          ...(currentFilter ? currentFilter : []),
          property.name,
        ]);
      });
    });
  } else {
    properties.forEach((property) => {
      Object.entries(Filter.keys).forEach(([key, value]) => {
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

describe("filter", () => {
  test("simulate getFilteredArray", () => {
    const array = filterArray(defaultProperties);
    console.log(array);
  });
});
