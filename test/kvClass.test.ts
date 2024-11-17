import { test } from "vitest";
import { FilterClass } from "../KV/filter";
import { defaultProperties } from "../KV/properties";
//add to Filter class

describe("filter", () => {
  test("simulate getFilteredArray", () => {
    const array = FilterClass.filterArray(defaultProperties);
    console.log(array);
  });
});
