import { expect, describe, it } from "vite-plus/test";

import {
  compareIdentifiers,
  createIdentifierComparator,
} from "../../src/identifier/compareIdentifiers.ts";

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

describe("createIdentifierComparator", () => {
  it("orders listed series first, in the given order", () => {
    const compare = createIdentifierComparator(["TREX", "ORB", "MB"]);

    expect(["MB-1", "ORB-1", "TREX-1"].toSorted(compare)).toEqual(["TREX-1", "ORB-1", "MB-1"]);
  });

  it("orders unlisted series after listed ones, alphabetically", () => {
    const compare = createIdentifierComparator(["MB"]);

    expect(["TREX-1", "ARC-1", "MB-1"].toSorted(compare)).toEqual(["MB-1", "ARC-1", "TREX-1"]);
  });

  it("orders within a series by item, then part", () => {
    const compare = createIdentifierComparator(["MB"]);

    expect(["MB-10", "MB-2-1", "MB-2"].toSorted(compare)).toEqual(["MB-2", "MB-2-1", "MB-10"]);
  });

  it("orders the same array differently to compareIdentifiers", () => {
    const ids = ["TREX-1", "MB-2", "ARC-1", "MB-1-1", "nope"];
    const compare = createIdentifierComparator(["MB"]);

    expect(ids.toSorted(compareIdentifiers)).toEqual(["ARC-1", "MB-1-1", "MB-2", "TREX-1", "nope"]);
    expect(ids.toSorted(compare)).toEqual(["MB-1-1", "MB-2", "ARC-1", "TREX-1", "nope"]);
  });

  it("orders invalid identifiers last", () => {
    const compare = createIdentifierComparator(["MB"]);

    expect(["nope", "ARC-1", "MB-1"].toSorted(compare)).toEqual(["MB-1", "ARC-1", "nope"]);
  });
});
