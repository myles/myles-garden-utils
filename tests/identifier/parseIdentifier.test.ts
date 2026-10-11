import { expect, describe, it } from "vite-plus/test";

import { parseIdentifier } from "../../src/identifier/parseIdentifier.ts";

describe("parseIdentifier", () => {
  it("splits an identifier into its series and item", () => {
    expect(parseIdentifier("MB-100")).toEqual({ series: "MB", item: 100 });
    expect(parseIdentifier("TREX-1")).toEqual({ series: "TREX", item: 1 });
  });

  it("includes the part when there is one", () => {
    expect(parseIdentifier("MB-100-1")).toEqual({
      series: "MB",
      item: 100,
      part: 1,
    });
  });

  it("reads leading zeros as numbers", () => {
    expect(parseIdentifier("MB-007-02")).toEqual({
      series: "MB",
      item: 7,
      part: 2,
    });
  });

  it("returns undefined for a malformed identifier", () => {
    expect(parseIdentifier("mb-100")).toBeUndefined();
    expect(parseIdentifier("MB100")).toBeUndefined();
    expect(parseIdentifier("MB-100-1-2")).toBeUndefined();
  });
});
