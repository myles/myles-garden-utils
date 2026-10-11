import { expect, describe, it } from "vite-plus/test";

import { toCanonicalUrl, trimTrailingSlash } from "../../src/text/toCanonicalUrl.ts";

describe("trimTrailingSlash", () => {
  it("drops a trailing slash", () => {
    expect(trimTrailingSlash("/myles-garden/")).toBe("/myles-garden");
  });

  it("leaves a path that has none alone", () => {
    expect(trimTrailingSlash("/myles-garden")).toBe("/myles-garden");
  });

  it("leaves the root alone, having nothing to trim", () => {
    expect(trimTrailingSlash("/")).toBe("/");
  });

  it("trims only the last segment's slash", () => {
    expect(trimTrailingSlash("/a/b/c/")).toBe("/a/b/c");
  });
});

describe("toCanonicalUrl", () => {
  it("trims the trailing slash from a whole URL", () => {
    expect(toCanonicalUrl("https://example.com/myles-garden/")).toBe(
      "https://example.com/myles-garden",
    );
  });

  it("keeps the root's slash, which a URL cannot omit", () => {
    expect(toCanonicalUrl("https://example.com/")).toBe("https://example.com/");
  });
});
