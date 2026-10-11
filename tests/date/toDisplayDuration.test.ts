import { expect, describe, it } from "vite-plus/test";

import { toDisplayDuration } from "../../src/date/toDisplayDuration.ts";

describe("toDisplayDuration", () => {
  it("shows years and months", () => {
    expect(toDisplayDuration(new Date(2020, 0, 1), new Date(2022, 3, 15))).toBe("2 years 3 months");
  });

  it("leaves out zero units", () => {
    expect(toDisplayDuration(new Date(2020, 0, 1), new Date(2021, 0, 1))).toBe("1 year");
    expect(toDisplayDuration(new Date(2020, 0, 1), new Date(2020, 2, 1))).toBe("2 months");
  });

  it("describes anything under a month", () => {
    expect(toDisplayDuration(new Date(2020, 0, 1), new Date(2020, 0, 20))).toBe(
      "Less than a month",
    );
  });

  it("defaults the end to now", () => {
    const aboutAYearAgo = new Date(Date.now() - 400 * 24 * 60 * 60 * 1000);

    expect(toDisplayDuration(aboutAYearAgo)).toMatch(/^1 year/);
  });
});
