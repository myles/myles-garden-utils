import { expect, describe, it } from "vite-plus/test";

import { toApaStyleTitleCase } from "../../src/text/toApaStyleTitleCase.ts";

describe("toApaStyleTitleCase", () => {
  it("capitalizes the first and last words", () => {
    expect(toApaStyleTitleCase("the quick brown fox")).toBe("The Quick Brown Fox");
    expect(toApaStyleTitleCase("a journey to the center of the earth")).toBe(
      "A Journey to the Center of the Earth",
    );
  });

  it("captializes the first word after a colon", () => {
    expect(toApaStyleTitleCase("understanding AI: a beginner's guide")).toBe(
      "Understanding AI: A Beginner's Guide",
    );
    expect(toApaStyleTitleCase("life on mars: the search for answers")).toBe(
      "Life on Mars: The Search for Answers",
    );
  });

  it("second part of hyphenated major words are capitalized", () => {
    expect(toApaStyleTitleCase("state-of-the-art technology")).toBe("State-of-the-Art Technology");
    expect(toApaStyleTitleCase("long-term effects of pollution")).toBe(
      "Long-Term Effects of Pollution",
    );
  });
});

describe("toApaStyleTitleCase with hyphenated edge words", () => {
  it("capitalizes the first part of a hyphenated first word", () => {
    expect(toApaStyleTitleCase("the-end of days")).toBe("The-End of Days");
  });

  it("capitalizes the first part of a hyphenated word after a colon", () => {
    expect(toApaStyleTitleCase("chapter one: a-ha moments")).toBe("Chapter One: A-Ha Moments");
  });

  it("capitalizes the last part of a hyphenated last word", () => {
    expect(toApaStyleTitleCase("a guide to the follow-up")).toBe("A Guide to the Follow-Up");
  });
});

describe("toApaStyleTitleCase with custom minor words", () => {
  it("applies the custom minor words to unhyphenated words", () => {
    const minorWords = new Set(["the"]);
    expect(toApaStyleTitleCase("lord of the rings", { minorWords })).toBe("Lord Of the Rings");
  });
});
