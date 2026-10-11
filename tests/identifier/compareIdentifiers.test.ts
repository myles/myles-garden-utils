import { expect, describe, it } from "vite-plus/test";

import { compareIdentifiers } from "../../src/identifier/compareIdentifiers.ts";

const sortIdentifiers = (ids: string[]): string[] => ids.toSorted(compareIdentifiers);

describe("compareIdentifiers", () => {
  it("orders by series", () => {
    expect(sortIdentifiers(["TREX-1", "MB-1", "AB-1"])).toEqual(["AB-1", "MB-1", "TREX-1"]);
  });

  it("orders items numerically", () => {
    expect(sortIdentifiers(["MB-10", "MB-2", "MB-100"])).toEqual(["MB-2", "MB-10", "MB-100"]);
  });

  it("orders an identifier before its parts", () => {
    expect(sortIdentifiers(["MB-100-2", "MB-100-0", "MB-100"])).toEqual([
      "MB-100",
      "MB-100-0",
      "MB-100-2",
    ]);
  });

  it("orders parts numerically", () => {
    expect(sortIdentifiers(["MB-1-10", "MB-1-2"])).toEqual(["MB-1-2", "MB-1-10"]);
  });

  it("orders invalid identifiers last, as plain strings", () => {
    expect(sortIdentifiers(["zebra", "MB-2", "apple", "MB-1"])).toEqual([
      "MB-1",
      "MB-2",
      "apple",
      "zebra",
    ]);
  });

  it("returns zero for equal identifiers", () => {
    expect(compareIdentifiers("MB-100-1", "MB-100-1")).toBe(0);
    expect(compareIdentifiers("nope", "nope")).toBe(0);
  });
});
