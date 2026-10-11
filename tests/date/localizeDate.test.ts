import { expect, describe, it } from "vite-plus/test";

import { localizeDate } from "../../src/date/localizeDate.ts";

describe("localizeDate", () => {
  it("defaults to America/Toronto", () => {
    const date = localizeDate(new Date("2023-10-05T14:30:00Z"));

    expect(date.timeZone).toBe("America/Toronto");
    expect(date.getHours()).toBe(10);
  });

  it("uses the given time zone", () => {
    const date = localizeDate(new Date("2023-10-05T14:30:00Z"), {
      timeZone: "Asia/Tokyo",
    });

    expect(date.getHours()).toBe(23);
  });

  it("keeps the instant", () => {
    const instant = new Date("2023-10-05T14:30:00Z");

    expect(localizeDate(instant).getTime()).toBe(instant.getTime());
  });
});
