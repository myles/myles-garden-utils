import { expect, describe, it } from "vite-plus/test";

import { isNestedUnder } from "../../src/identifier/isNestedUnder.ts";

describe("isNestedUnder", () => {
  it("nests a part beneath its item", () => {
    expect(isNestedUnder("MB-404-14", "MB-404")).toBe(true);
  });

  it("nests part zero beneath its item", () => {
    expect(isNestedUnder("MB-404-0", "MB-404")).toBe(true);
  });

  it("does not nest across series that share an item", () => {
    expect(isNestedUnder("TREX-404-14", "MB-404")).toBe(false);
  });

  it("does not nest under a different item", () => {
    expect(isNestedUnder("MB-405-14", "MB-404")).toBe(false);
  });

  it("does not nest an item under itself", () => {
    expect(isNestedUnder("MB-404", "MB-404")).toBe(false);
  });

  it("does not nest an item under another item", () => {
    expect(isNestedUnder("MB-405", "MB-404")).toBe(false);
  });

  it("does not nest anything under a part", () => {
    expect(isNestedUnder("MB-404-14", "MB-404-14")).toBe(false);
    expect(isNestedUnder("MB-404-1", "MB-404-14")).toBe(false);
  });

  it("does not nest invalid identifiers", () => {
    expect(isNestedUnder("MB 404-14", "MB 404")).toBe(false);
    expect(isNestedUnder("nope", "MB-404")).toBe(false);
    expect(isNestedUnder("MB-404-14", "nope")).toBe(false);
  });
});
