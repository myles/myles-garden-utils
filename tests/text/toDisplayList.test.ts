import { expect, describe, it } from "vite-plus/test";

import { ListStyle, toDisplayList } from "../../src/text/toDisplayList.ts";

describe("toDisplayList", () => {
  it("joins with the given style", () => {
    const items = ["tea", "coffee", "juice"];

    expect(toDisplayList(items, ListStyle.And)).toBe("tea, coffee, and juice");
    expect(toDisplayList(items, ListStyle.Or)).toBe("tea, coffee, or juice");
    expect(toDisplayList(items, ListStyle.None)).toBe("tea, coffee, juice");
  });

  it("handles short lists", () => {
    expect(toDisplayList([], ListStyle.Or)).toBe("");
    expect(toDisplayList(["tea"], ListStyle.Or)).toBe("tea");
    expect(toDisplayList(["tea", "coffee"], ListStyle.Or)).toBe("tea or coffee");
  });

  it("follows the locale's serial comma convention", () => {
    const items = ["tea", "coffee", "juice"];

    expect(toDisplayList(items, ListStyle.And, { locale: "en-CA" })).toBe("tea, coffee and juice");
    expect(toDisplayList(items, ListStyle.And, { locale: "fr" })).toBe("tea, coffee et juice");
  });
});
