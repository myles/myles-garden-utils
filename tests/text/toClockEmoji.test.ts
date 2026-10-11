import { expect, describe, it } from "vite-plus/test";

import { toClockEmoji } from "../../src/text/toClockEmoji.ts";

describe("toClockEmoji", () => {
  it("returns the clock face for the hour", () => {
    expect(toClockEmoji(new Date(2026, 9, 10, 1))).toBe("🕐");
    expect(toClockEmoji(new Date(2026, 9, 10, 9))).toBe("🕘");
  });

  it("uses the twelve o'clock face for midnight and noon", () => {
    expect(toClockEmoji(new Date(2026, 9, 10, 0))).toBe("🕛");
    expect(toClockEmoji(new Date(2026, 9, 10, 12))).toBe("🕛");
  });

  it("wraps afternoon hours onto the twelve-hour face", () => {
    expect(toClockEmoji(new Date(2026, 9, 10, 13))).toBe("🕐");
    expect(toClockEmoji(new Date(2026, 9, 10, 23))).toBe("🕚");
  });

  it("ignores minutes", () => {
    expect(toClockEmoji(new Date(2026, 9, 10, 3, 59))).toBe("🕒");
  });

  it("throws on an invalid date", () => {
    expect(() => toClockEmoji(new Date("nope"))).toThrow("Invalid date");
    expect(() => toClockEmoji(new Date("nope"))).toThrow(RangeError);
  });
});
