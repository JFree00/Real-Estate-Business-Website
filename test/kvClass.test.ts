import { test } from "vitest";
import { FilterClass } from "../KV/filter";
import { defaultProperties } from "../KV/properties";
//add to Filter class

describe("filter", () => {
  const array = FilterClass.mapAllFilters(defaultProperties);
  test("simulate getFilteredArray", () => {
    console.log(array);
  });
  test("Convert from to Cursor", () => {
    const cursor = FilterClass.toCursor(array);
    const fromCursor = FilterClass.fromCursor(cursor);
    console.log(cursor);
  });
});
