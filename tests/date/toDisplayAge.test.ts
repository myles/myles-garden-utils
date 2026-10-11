import { expect, describe, it } from "vite-plus/test";

import { toDisplayAge } from "../../src/date/toDisplayAge.ts";

const BIRTH_DATE = new Date("2020-01-01T00:00:00Z");

describe("toDisplayAge", () => {
  it.each([
    ["2020-01-01T00:01:00Z", "1 minute"],
    ["2020-01-01T00:02:00Z", "2 minutes"],
    ["2020-01-01T01:00:00Z", "1 hour"],
    ["2020-01-01T02:00:00Z", "2 hours"],
    ["2020-01-02T00:00:00Z", "1 day"],
    ["2020-01-03T00:00:00Z", "2 days"],
    ["2020-01-08T00:00:00Z", "1 week"],
    ["2020-01-15T00:00:00Z", "2 weeks"],
    ["2021-01-01T00:00:00Z", "1 year"],
    ["2022-01-01T00:00:00Z", "2 years"],
  ])("describes %s as %s", (now, expected) => {
    expect(toDisplayAge(BIRTH_DATE, { now: new Date(now) })).toBe(expected);
  });

  it("joins every non-zero unit", () => {
    const birthDate = new Date("1990-01-01T00:00:00-05:00");
    const now = new Date("2023-10-05T14:30:00-05:00");

    expect(toDisplayAge(birthDate, { now })).toBe(
      "33 years, 39 weeks, 4 days, 15 hours, and 30 minutes",
    );
  });

  it("returns an empty string at the moment of birth", () => {
    expect(toDisplayAge(BIRTH_DATE, { now: BIRTH_DATE })).toBe("");
  });

  it("throws for a birth date in the future", () => {
    const now = new Date("2019-01-01T00:00:00Z");

    expect(() => toDisplayAge(BIRTH_DATE, { now })).toThrow("Birth date cannot be in the future");
  });
});
