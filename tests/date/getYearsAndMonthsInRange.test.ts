import { expect, describe, it } from "vite-plus/test";

import { getYearsAndMonthsInRange } from "../../src/date/getYearsAndMonthsInRange.ts";

describe("getYearsAndMonthsInRange", () => {
  it("groups months by year, clamped to the range", () => {
    const result = getYearsAndMonthsInRange(new Date(2024, 10, 15), new Date(2025, 1, 10));

    expect(result).toEqual([
      { year: 2024, months: [new Date(2024, 10, 1), new Date(2024, 11, 1)] },
      { year: 2025, months: [new Date(2025, 0, 1), new Date(2025, 1, 1)] },
    ]);
  });

  it("returns one year for a range inside a single year", () => {
    const result = getYearsAndMonthsInRange(new Date(2025, 2, 1), new Date(2025, 2, 20));

    expect(result).toEqual([{ year: 2025, months: [new Date(2025, 2, 1)] }]);
  });
});
