import { expect, describe, it } from "vite-plus/test";

import { isIdentifier } from "../../src/regex/identifier.ts";

describe("isIdentifier", () => {
  it("accepts a prefix and number, with an optional suffix", () => {
    expect(isIdentifier("MB-100")).toBe(true);
    expect(isIdentifier("MB-100-1")).toBe(true);
    expect(isIdentifier("TREX-1")).toBe(true);
  });

  it("rejects malformed identifiers", () => {
    expect(isIdentifier("mb-100")).toBe(false);
    expect(isIdentifier("MB100")).toBe(false);
    expect(isIdentifier("MB-100-1-2")).toBe(false);
    expect(isIdentifier(" MB-100")).toBe(false);
  });
});
