import { test } from "vitest";
import { Filter } from "../data/filter";
import { defaultProperties } from "../data/properties";

describe("filter", () => {
  const array = Filter.toCursor(defaultProperties);
  const cursor = JSON.stringify(array);
  test("simulate getFilteredArray", () => {
    console.log(array);
  });
  test("anyWithFilter", () => {
    const newCursor = JSON.parse(cursor);
    const result = Filter.anyWithFilter(newCursor, ["BY-2018", "BY-2015"]);
    expect(result).not.toHaveLength(0);
  });
});
