import { expect, describe, it } from "vite-plus/test";

import { toDisplayPercentage } from "../../src/text/toDisplayPercentage.ts";

describe("toDisplayPercentage", () => {
  it("formats a ratio as a whole percentage", () => {
    expect(toDisplayPercentage(0.75)).toBe("75%");
    expect(toDisplayPercentage(0)).toBe("0%");
    expect(toDisplayPercentage(1)).toBe("100%");
  });

  it("rounds to whole numbers by default", () => {
    expect(toDisplayPercentage(0.7549)).toBe("75%");
    expect(toDisplayPercentage(0.755)).toBe("76%");
  });

  it("keeps up to maxFractionDigits, dropping trailing zeros", () => {
    expect(toDisplayPercentage(0.7549, { maxFractionDigits: 1 })).toBe("75.5%");
    expect(toDisplayPercentage(0.75, { maxFractionDigits: 1 })).toBe("75%");
  });

  it("handles values outside 0 to 1", () => {
    expect(toDisplayPercentage(1.5)).toBe("150%");
    expect(toDisplayPercentage(-0.25)).toBe("-25%");
  });

  it("follows the locale", () => {
    expect(toDisplayPercentage(0.755, { locale: "tr", maxFractionDigits: 1 })).toBe("%75,5");
  });
});
