import { expect, describe, it } from "vite-plus/test";

import { getQuarterRange } from "../../src/date/getQuarterRange.ts";

// TZDate#toISOString prints the zone's offset, so compare UTC instants.
const toIsoStrings = (dates: Date[]) => dates.map((date) => new Date(date.getTime()).toISOString());

describe("getQuarterRange", () => {
  it("covers each quarter of the year in Toronto", () => {
    expect(toIsoStrings(getQuarterRange(2025, 1))).toEqual([
      "2025-01-01T05:00:00.000Z",
      "2025-04-01T03:59:59.999Z",
    ]);
    expect(toIsoStrings(getQuarterRange(2025, 2))).toEqual([
      "2025-04-01T04:00:00.000Z",
      "2025-07-01T03:59:59.999Z",
    ]);
    expect(toIsoStrings(getQuarterRange(2025, 3))).toEqual([
      "2025-07-01T04:00:00.000Z",
      "2025-10-01T03:59:59.999Z",
    ]);
    expect(toIsoStrings(getQuarterRange(2025, 4))).toEqual([
      "2025-10-01T04:00:00.000Z",
      "2026-01-01T04:59:59.999Z",
    ]);
  });

  it("uses the given time zone", () => {
    expect(toIsoStrings(getQuarterRange(2025, 1, { timeZone: "UTC" }))).toEqual([
      "2025-01-01T00:00:00.000Z",
      "2025-03-31T23:59:59.999Z",
    ]);
  });

  it("throws on a quarter outside 1 to 4", () => {
    expect(() => getQuarterRange(2025, 0)).toThrow(RangeError);
    expect(() => getQuarterRange(2025, 5)).toThrow(RangeError);
    expect(() => getQuarterRange(2025, 1.5)).toThrow(RangeError);
  });
});
