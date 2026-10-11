import { expect, describe, it } from "vite-plus/test";

import { toIsoDuration } from "../../src/date/toIsoDuration.ts";

describe("toIsoDuration", () => {
  it("converts every field", () => {
    expect(
      toIsoDuration({
        years: 1,
        months: 2,
        days: 3,
        hours: 4,
        minutes: 5,
        seconds: 6,
      }),
    ).toBe("P1Y2M3DT4H5M6S");
  });

  it("leaves out the time designator when there is no time", () => {
    expect(toIsoDuration({ days: 3 })).toBe("P3D");
  });

  it("starts time-only durations with PT", () => {
    expect(toIsoDuration({ hours: 1, minutes: 30 })).toBe("PT1H30M");
  });

  it("includes weeks", () => {
    expect(toIsoDuration({ weeks: 2 })).toBe("P2W");
  });

  it("returns PT0S for an empty duration", () => {
    expect(toIsoDuration({})).toBe("PT0S");
    expect(toIsoDuration({ hours: 0 })).toBe("PT0S");
  });
});
