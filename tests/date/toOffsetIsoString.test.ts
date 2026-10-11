import { expect, describe, it } from "vite-plus/test";

import { toOffsetIsoString } from "../../src/date/toOffsetIsoString.ts";

describe("toOffsetIsoString", () => {
  it("carries Toronto's offset", () => {
    expect(toOffsetIsoString(new Date("2023-10-05T14:30:00Z"))).toBe("2023-10-05T10:30:00-04:00");
    expect(toOffsetIsoString(new Date("2023-01-05T14:30:00Z"))).toBe("2023-01-05T09:30:00-05:00");
  });

  it("uses the given time zone", () => {
    expect(
      toOffsetIsoString(new Date("2023-10-05T14:30:00Z"), {
        timeZone: "UTC",
      }),
    ).toBe("2023-10-05T14:30:00Z");
  });
});
