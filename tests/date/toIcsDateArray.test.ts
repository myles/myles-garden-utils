import { expect, describe, it } from "vite-plus/test";

import { toIcsDateArray } from "../../src/date/toIcsDateArray.ts";

describe("toIcsDateArray", () => {
  it("returns UTC parts with a 1-based month", () => {
    expect(toIcsDateArray(new Date("2023-10-05T14:30:45Z"))).toEqual([2023, 10, 5, 14, 30]);
  });

  it("uses UTC rather than the local day", () => {
    expect(toIcsDateArray(new Date("2023-10-05T23:30:00-04:00"))).toEqual([2023, 10, 6, 3, 30]);
  });
});
