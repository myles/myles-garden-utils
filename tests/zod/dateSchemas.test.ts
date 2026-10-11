import { expect, describe, it } from "vite-plus/test";

import { monthDaySchema, partialDateSchema, quarterSchema } from "../../src/zod/dateSchemas.ts";

const toIsoString = (date: Date) => new Date(date.getTime()).toISOString();

describe("partialDateSchema", () => {
  it("parses a year to its first instant in Toronto", () => {
    expect(toIsoString(partialDateSchema.parse("2025"))).toBe("2025-01-01T05:00:00.000Z");
  });

  it("parses a year-month", () => {
    expect(toIsoString(partialDateSchema.parse("2025-06"))).toBe("2025-06-01T04:00:00.000Z");
  });

  it("parses a full date", () => {
    expect(toIsoString(partialDateSchema.parse("2025-06-15"))).toBe("2025-06-15T04:00:00.000Z");
  });

  it("rejects other shapes", () => {
    expect(partialDateSchema.safeParse("25").success).toBe(false);
    expect(partialDateSchema.safeParse("2025-6").success).toBe(false);
    expect(partialDateSchema.safeParse("June 2025").success).toBe(false);
  });

  it("rejects impossible dates", () => {
    expect(partialDateSchema.safeParse("2025-02-30").success).toBe(false);
    expect(partialDateSchema.safeParse("2025-13").success).toBe(false);
  });
});

describe("monthDaySchema", () => {
  it("parses a month-day", () => {
    const date = monthDaySchema.parse("06-15");

    expect(date.getMonth()).toBe(5);
    expect(date.getDate()).toBe(15);
  });

  it("rejects other shapes and impossible days", () => {
    expect(monthDaySchema.safeParse("6-15").success).toBe(false);
    expect(monthDaySchema.safeParse("2025-06-15").success).toBe(false);
    expect(monthDaySchema.safeParse("13-01").success).toBe(false);
  });
});

describe("quarterSchema", () => {
  it("parses a quarter with its range", () => {
    const { value, year, quarter, startsAt, endsAt } = quarterSchema.parse("2025-Q2");

    expect({ value, year, quarter }).toEqual({
      value: "2025-Q2",
      year: 2025,
      quarter: 2,
    });
    expect(toIsoString(startsAt)).toBe("2025-04-01T04:00:00.000Z");
    expect(toIsoString(endsAt)).toBe("2025-07-01T03:59:59.999Z");
  });

  it("rejects quarters outside 1 to 4", () => {
    expect(quarterSchema.safeParse("2025-Q0").success).toBe(false);
    expect(quarterSchema.safeParse("2025-Q5").success).toBe(false);
  });

  it("rejects extra characters around a quarter", () => {
    expect(quarterSchema.safeParse("2025-Q12").success).toBe(false);
    expect(quarterSchema.safeParse("x2025-Q1").success).toBe(false);
  });
});
