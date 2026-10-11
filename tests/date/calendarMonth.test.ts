import { expect, describe, it } from "vite-plus/test";

import { endOfCalendarMonth, startOfCalendarMonth } from "../../src/date/calendarMonth.ts";

// October 2026 starts on a Thursday and ends on a Saturday.
describe("startOfCalendarMonth", () => {
  it("goes back to the previous Monday", () => {
    expect(startOfCalendarMonth(new Date(2026, 9, 1))).toEqual(new Date(2026, 8, 28));
  });

  it("keeps a Monday", () => {
    expect(startOfCalendarMonth(new Date(2026, 8, 28))).toEqual(new Date(2026, 8, 28));
  });
});

describe("endOfCalendarMonth", () => {
  it("goes forward to the next Sunday", () => {
    expect(endOfCalendarMonth(new Date(2026, 9, 31))).toEqual(new Date(2026, 10, 1));
  });

  it("keeps a Sunday", () => {
    expect(endOfCalendarMonth(new Date(2026, 10, 1))).toEqual(new Date(2026, 10, 1));
  });
});
