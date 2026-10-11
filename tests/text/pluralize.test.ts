import { expect, describe, it } from "vite-plus/test";

import { pluralize } from "../../src/text/pluralize.ts";

describe("pluralize", () => {
  it("returns the singular when the count is one", () => {
    expect(pluralize(1, "cat")).toBe("cat");
    expect(pluralize(1, "mouse", { plural: "mice" })).toBe("mouse");
  });

  it("appends an s when no plural is provided", () => {
    expect(pluralize(0, "cat")).toBe("cats");
    expect(pluralize(2, "cat")).toBe("cats");
  });

  it("uses the provided plural", () => {
    expect(pluralize(2, "mouse", { plural: "mice" })).toBe("mice");
  });
});
