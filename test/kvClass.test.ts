import { Filter } from "../data/filter";
import { defaultProperties } from "../data/properties";

describe("test filter", () => {
  const mockKVReturn = Filter.toCursor(
    defaultProperties.map((p) => p.metadata),
  );
  const cursor = JSON.stringify(mockKVReturn); //what would be stored and retrieved as a cursor in the kv
  it("abbreviate for server storage", () => {
    expect(Filter.abbreviate("property_type", "Apartment")).toBe(
      "PT-Apartment",
    );
    expect(Filter.abbreviate("location", "London")).toBe("L-London");
    expect(Filter.abbreviate("build_year", "2018")).toBe("BY-2018");
    expect(Filter.abbreviate("price", "100000")).toBe("PR-100000");
  });

  it("extract original value from abbreviated key", () => {
    expect(Filter.expandAbbreviate("PT-Apartment")).toEqual([
      "property_type",
      "Apartment",
    ]);
  });
  it("expect stored values to be readable via abbreviation", () => {
    expect(
      Filter.toCursor(defaultProperties.map((p) => p.metadata)).flat(),
    ).toContain(
      Filter.abbreviate(
        "build_year",
        defaultProperties[0].metadata.build_year.toString(),
      ),
    );
  });
});
