import { expect, describe, it } from "vite-plus/test";

import { getWeekRange } from "../../src/date/getWeekRange.ts";

// TZDate#toISOString prints the zone's offset, so compare UTC instants.
const toIsoStrings = (dates: Date[]) => dates.map((date) => new Date(date.getTime()).toISOString());

// 19 October 2026 is a Monday; Toronto leaves daylight time on 1 November.
describe("getWeekRange", () => {
  it("spans Monday to Sunday in Toronto", () => {
    expect(toIsoStrings(getWeekRange(new Date("2026-10-24T16:00:00Z")))).toEqual([
      "2026-10-19T04:00:00.000Z",
      "2026-10-26T03:59:59.999Z",
    ]);
  });

  it("keeps a Monday and a Sunday in their own week", () => {
    const expected = ["2026-10-19T04:00:00.000Z", "2026-10-26T03:59:59.999Z"];
    expect(toIsoStrings(getWeekRange(new Date("2026-10-19T04:00:00Z")))).toEqual(expected);
    expect(toIsoStrings(getWeekRange(new Date("2026-10-26T03:59:59.999Z")))).toEqual(expected);
  });

  it("crosses a daylight saving change", () => {
    expect(toIsoStrings(getWeekRange(new Date("2026-10-28T16:00:00Z")))).toEqual([
      "2026-10-26T04:00:00.000Z",
      "2026-11-02T04:59:59.999Z",
    ]);
  });

  it("reads the day in the given time zone", () => {
    // Monday 02:00 in UTC is still Sunday evening in Toronto.
    const date = new Date("2026-10-19T02:00:00Z");

    expect(toIsoStrings(getWeekRange(date))).toEqual([
      "2026-10-12T04:00:00.000Z",
      "2026-10-19T03:59:59.999Z",
    ]);
    expect(toIsoStrings(getWeekRange(date, { timeZone: "UTC" }))).toEqual([
      "2026-10-19T00:00:00.000Z",
      "2026-10-25T23:59:59.999Z",
    ]);
  });

  it("rejects an invalid date", () => {
    expect(() => getWeekRange(new Date("not a date"))).toThrow(RangeError);
  });
});
