import { expect, describe, it } from "vite-plus/test";

import { toDisplayIsbn } from "../../src/text/toDisplayIsbn.ts";

describe("toDisplayIsbn", () => {
  it("hyphenates an ISBN-13 using the registration ranges", () => {
    expect(toDisplayIsbn("9780306406157")).toBe("978-0-306-40615-7");
    expect(toDisplayIsbn("9780198534532")).toBe("978-0-19-853453-2");
  });

  it("hyphenates an ISBN-10 using the registration ranges", () => {
    expect(toDisplayIsbn("0306406152")).toBe("0-306-40615-2");
    expect(toDisplayIsbn("0198534531")).toBe("0-19-853453-1");
  });

  it("keeps an X check digit", () => {
    expect(toDisplayIsbn("080442957X")).toBe("0-8044-2957-X");
    expect(toDisplayIsbn("080442957x")).toBe("0-8044-2957-X");
  });

  it("accepts input that is already hyphenated or spaced", () => {
    expect(toDisplayIsbn("978-0-3064-0615-7")).toBe("978-0-306-40615-7");
    expect(toDisplayIsbn("978 0 306 40615 7")).toBe("978-0-306-40615-7");
  });

  it("returns the bare ISBN when its range is unassigned", () => {
    expect(toDisplayIsbn("9786700000001")).toBe("9786700000001");
  });

  it("throws on malformed input", () => {
    expect(() => toDisplayIsbn("12345")).toThrow('Invalid ISBN: "12345"');
    expect(() => toDisplayIsbn("12345")).toThrow(RangeError);
    expect(() => toDisplayIsbn("978030640615X")).toThrow(RangeError);
    expect(() => toDisplayIsbn("9770306406157")).toThrow(RangeError);
    expect(() => toDisplayIsbn("03064X6152")).toThrow(RangeError);
  });
});
