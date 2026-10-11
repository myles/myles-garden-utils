import { expect, describe, it } from "vite-plus/test";

import { toIsoDate } from "../../src/date/toIsoDate.ts";

describe("toIsoDate", () => {
  it("uses Toronto's calendar date", () => {
    // 2 AM UTC on the 6th is still the evening of the 5th in Toronto.
    expect(toIsoDate(new Date("2023-10-06T02:00:00Z"))).toBe("2023-10-05");
  });

  it("uses the given time zone", () => {
    expect(toIsoDate(new Date("2023-10-06T02:00:00Z"), { timeZone: "UTC" })).toBe("2023-10-06");
  });

  it("zero-pads the month and day", () => {
    expect(toIsoDate(new Date("2023-01-05T14:30:00Z"))).toBe("2023-01-05");
  });
});
