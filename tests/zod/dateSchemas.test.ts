import { expect, describe, it } from "vite-plus/test";

import { MonthDaySchema, PartialDateSchema, QuarterSchema } from "../../src/zod/dateSchemas.ts";

const toIsoString = (date: Date) => new Date(date.getTime()).toISOString();

describe("PartialDateSchema", () => {
  it("parses a year to its first instant in Toronto", () => {
    expect(toIsoString(PartialDateSchema.parse("2025"))).toBe("2025-01-01T05:00:00.000Z");
  });

  it("parses a year-month", () => {
    expect(toIsoString(PartialDateSchema.parse("2025-06"))).toBe("2025-06-01T04:00:00.000Z");
  });

  it("parses a full date", () => {
    expect(toIsoString(PartialDateSchema.parse("2025-06-15"))).toBe("2025-06-15T04:00:00.000Z");
  });

  it("rejects other shapes", () => {
    expect(PartialDateSchema.safeParse("25").success).toBe(false);
    expect(PartialDateSchema.safeParse("2025-6").success).toBe(false);
    expect(PartialDateSchema.safeParse("June 2025").success).toBe(false);
  });

  it("rejects impossible dates", () => {
    expect(PartialDateSchema.safeParse("2025-02-30").success).toBe(false);
    expect(PartialDateSchema.safeParse("2025-13").success).toBe(false);
  });
});

describe("MonthDaySchema", () => {
  it("parses a month-day", () => {
    const date = MonthDaySchema.parse("06-15");

    expect(date.getMonth()).toBe(5);
    expect(date.getDate()).toBe(15);
  });

  it("rejects other shapes and impossible days", () => {
    expect(MonthDaySchema.safeParse("6-15").success).toBe(false);
    expect(MonthDaySchema.safeParse("2025-06-15").success).toBe(false);
    expect(MonthDaySchema.safeParse("13-01").success).toBe(false);
  });
});

describe("QuarterSchema", () => {
  it("parses a quarter with its range", () => {
    const { value, year, quarter, startsAt, endsAt } = QuarterSchema.parse("2025-Q2");

    expect({ value, year, quarter }).toEqual({
      value: "2025-Q2",
      year: 2025,
      quarter: 2,
    });
    expect(toIsoString(startsAt)).toBe("2025-04-01T04:00:00.000Z");
    expect(toIsoString(endsAt)).toBe("2025-07-01T03:59:59.999Z");
  });

  it("rejects quarters outside 1 to 4", () => {
    expect(QuarterSchema.safeParse("2025-Q0").success).toBe(false);
    expect(QuarterSchema.safeParse("2025-Q5").success).toBe(false);
  });

  it("rejects extra characters around a quarter", () => {
    expect(QuarterSchema.safeParse("2025-Q12").success).toBe(false);
    expect(QuarterSchema.safeParse("x2025-Q1").success).toBe(false);
  });
});
