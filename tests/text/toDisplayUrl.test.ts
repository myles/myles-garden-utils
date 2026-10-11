import { expect, describe, it } from "vite-plus/test";

import { toDisplayUrl } from "../../src/text/toDisplayUrl.ts";

describe("toDisplayUrl", () => {
  it("returns the full URL when no options are provided", () => {
    expect(toDisplayUrl("https://example.com/path/to/resource")).toBe(
      "example.com/path/to/resource",
    );
  });
  it("truncates the path when maxPathChars option is provided", () => {
    expect(
      toDisplayUrl("https://example.com/path/to/resource", {
        maxPathChars: 3,
      }),
    ).toBe("example.com/pa...");
  });
  it("handles URLs without a path correctly", () => {
    expect(toDisplayUrl("https://example.com", { maxPathChars: 3 })).toBe("example.com");
  });
  it("handles URLs with short paths correctly", () => {
    expect(toDisplayUrl("https://example.com/ab", { maxPathChars: 5 })).toBe("example.com/ab");
  });
  it("handles URLs that can't be truncated", () => {
    expect(toDisplayUrl("example.com/path/to/resource", { maxPathChars: 4 })).toBe(
      "example.com/path/to/resource",
    );
  });
});
