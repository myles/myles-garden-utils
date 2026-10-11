import { expect, describe, it } from "vite-plus/test";

import { isIsbn10, isIsbn13 } from "../../src/regex/isbn.ts";

describe("isIsbn10", () => {
  it("accepts ten digits or nine digits and an X", () => {
    expect(isIsbn10("0306406152")).toBe(true);
    expect(isIsbn10("030640615X")).toBe(true);
  });

  it("rejects anything else", () => {
    expect(isIsbn10("0-306-40615-2")).toBe(false);
    expect(isIsbn10("030640615x")).toBe(false);
    expect(isIsbn10("9780306406157")).toBe(false);
  });
});

describe("isIsbn13", () => {
  it("accepts thirteen digits with a 978 or 979 prefix", () => {
    expect(isIsbn13("9780306406157")).toBe(true);
    expect(isIsbn13("9791234567896")).toBe(true);
  });

  it("rejects anything else", () => {
    expect(isIsbn13("978-0-306-40615-7")).toBe(false);
    expect(isIsbn13("9770306406157")).toBe(false);
    expect(isIsbn13("0306406152")).toBe(false);
  });
});
