import { expect, describe, it } from "vite-plus/test";

import {
  DateStyle,
  toDisplayDate,
  toDisplayDateTime,
  toDisplayTime,
} from "../../src/date/toDisplayDate.ts";

const DATE = new Date("2023-10-05T14:30:00Z");

describe("toDisplayDate", () => {
  it("defaults to the short style in Toronto", () => {
    expect(toDisplayDate(DATE)).toBe("5 Oct, 2023");
  });

  it("formats the long style", () => {
    expect(toDisplayDate(DATE, { style: DateStyle.Long })).toBe("Thursday 5th October, 2023");
  });

  it("uses the given time zone", () => {
    const lateEvening = new Date("2023-10-05T23:30:00-04:00");

    expect(toDisplayDate(lateEvening, { timeZone: "UTC" })).toBe("6 Oct, 2023");
  });
});

describe("toDisplayTime", () => {
  it("formats the time in Toronto", () => {
    expect(toDisplayTime(DATE)).toBe("10:30 AM");
  });

  it("uses the given time zone", () => {
    expect(toDisplayTime(DATE, { timeZone: "UTC" })).toBe("2:30 PM");
  });
});

describe("toDisplayDateTime", () => {
  it("joins the date and time", () => {
    expect(toDisplayDateTime(DATE)).toBe("5 Oct, 2023 at 10:30 AM");
  });

  it("formats the long style", () => {
    expect(toDisplayDateTime(DATE, { style: DateStyle.Long })).toBe(
      "Thursday 5th October, 2023 at 10:30 AM",
    );
  });
});
