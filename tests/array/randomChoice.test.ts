import { afterEach, expect, describe, it, vi } from "vite-plus/test";

import { randomChoice } from "../../src/array/randomChoice.ts";

describe("randomChoice", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("picks the item at the random index", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);

    expect(randomChoice(["a", "b", "c", "d"])).toBe("c");
  });

  it("can pick the first and last items", () => {
    const random = vi.spyOn(Math, "random");

    random.mockReturnValue(0);
    expect(randomChoice(["a", "b", "c"])).toBe("a");

    random.mockReturnValue(0.999_999);
    expect(randomChoice(["a", "b", "c"])).toBe("c");
  });

  it("throws on an empty array", () => {
    expect(() => randomChoice([])).toThrow(RangeError);
  });
});
