import { afterEach, expect, describe, it, vi } from "vite-plus/test";

import { compareBySortKey, toSortKey } from "../../src/text/toSortKey.ts";

describe("toSortKey", () => {
  it("removes a leading article", () => {
    expect(toSortKey("The Great Gatsby")).toBe("great gatsby");
    expect(toSortKey("A Tale of Two Cities")).toBe("tale of two cities");
    expect(toSortKey("An Unexpected Journey")).toBe("unexpected journey");
  });

  it("is case insensitive", () => {
    expect(toSortKey("the great gatsby")).toBe("great gatsby");
  });

  it("keeps titles without a leading article", () => {
    expect(toSortKey("Moby Dick")).toBe("moby dick");
    expect(toSortKey("War and Peace")).toBe("war and peace");
  });

  it("only removes articles that are whole words", () => {
    expect(toSortKey("Theory of Everything")).toBe("theory of everything");
    expect(toSortKey("Another Country")).toBe("another country");
    expect(toSortKey("Atonement")).toBe("atonement");
  });

  it("only removes the first leading article", () => {
    expect(toSortKey("The A to Z")).toBe("a to z");
  });

  it("keeps a title that is only an article", () => {
    expect(toSortKey("The")).toBe("the");
  });

  it("returns an empty string unchanged", () => {
    expect(toSortKey("")).toBe("");
  });

  it("removes an article followed by any whitespace", () => {
    expect(toSortKey("The   Road")).toBe("road");
    expect(toSortKey("The\tRoad")).toBe("road");
  });

  it("keeps accented and non-Latin letters", () => {
    expect(toSortKey("Émile")).toBe("émile");
    expect(toSortKey("Björk: Homogenic")).toBe("björk homogenic");
    expect(toSortKey("Les Misérables")).toBe("les misérables");
  });

  it("ignores surrounding whitespace", () => {
    expect(toSortKey("  The Road")).toBe("road");
    expect(toSortKey("\nThe Road\n")).toBe("road");
  });
});

describe("compareBySortKey", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("treats titles that differ only by article or case as equal", () => {
    expect(compareBySortKey("The Road", "Road")).toBe(0);
    expect(compareBySortKey("THE ROAD", "the road")).toBe(0);
  });

  it("sorts a list of titles by their sort keys", () => {
    const titles = [
      "The Hobbit",
      "Neuromancer",
      "A Wizard of Earthsea",
      "An Absolutely Remarkable Thing",
      "Dune",
    ];

    expect(titles.toSorted(compareBySortKey)).toEqual([
      "An Absolutely Remarkable Thing",
      "Dune",
      "The Hobbit",
      "Neuromancer",
      "A Wizard of Earthsea",
    ]);
  });

  it("sorts accented letters alongside their base letter", () => {
    expect(["Zadie", "Émile", "Eve"].toSorted(compareBySortKey)).toEqual(["Émile", "Eve", "Zadie"]);
    expect(compareBySortKey("Ärlig", "Zebra")).toBeLessThan(0);
  });

  it("compares with a fixed locale, not the runtime default", () => {
    const localeCompare = vi.spyOn(String.prototype, "localeCompare");

    compareBySortKey("Ärlig", "Zebra");

    expect(localeCompare).toHaveBeenCalledWith("zebra", "en");
  });
});
