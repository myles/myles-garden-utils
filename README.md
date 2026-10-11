# `@myles-garden/utils`

> The shared text, date, array, and identifier helpers for [myles.garden](https://myles.garden)

A small TypeScript package of the formatting and data helpers shared across [myles.garden](https://myles.garden) and its sibling projects: display strings for dates, lists, URLs, and ISBNs; time-zone-aware date maths; sorting; registry identifiers like `MB-100-1`; and a few [zod](https://zod.dev) schemas for partial dates and identifiers.

Every function is framework-free and ships as ESM with type declarations. Date helpers default to `America/Toronto` and the site's date formats, but take a `{ timeZone }` option wherever it matters.

## Requirements

- **An ESM environment.** The package is published as ES modules only.
- **[date-fns](https://date-fns.org) v4** and **[@date-fns/tz](https://github.com/date-fns/tz) v1**, only if you use the [`/date`](#dates) or [`/zod`](#zod-schemas) entry points.
- **[zod](https://zod.dev) v3.25+ or v4**, only if you use the [`/zod` entry point](#zod-schemas).

All three are **optional** peer dependencies. The main entry point imports none of them, so the text, array, identifier, and regex helpers work without them.

## Installation

```sh
npm install @myles-garden/utils
```

If you want the date helpers:

```sh
npm install date-fns @date-fns/tz
```

If you also want the zod schemas:

```sh
npm install date-fns @date-fns/tz zod
```

## Usage

Import the text, array, identifier, and regex helpers from the main entry point:

```ts
import {
  compareBySortKey,
  createIdentifierComparator,
  toDisplayAndList,
  toDisplayIsbn,
} from "@myles-garden/utils";

toDisplayAndList(["tea", "coffee", "juice"]); // "tea, coffee, and juice"
toDisplayIsbn("9780306406157"); // "978-0-306-40615-7"

["The Hobbit", "Dune", "A Wizard of Earthsea"].toSorted(compareBySortKey);
// ["Dune", "The Hobbit", "A Wizard of Earthsea"]

["TREX-1", "MB-2", "ARC-1"].toSorted(createIdentifierComparator(["MB"]));
// ["MB-2", "ARC-1", "TREX-1"]
```

The date helpers and schemas live behind their own entry points:

```ts
import { toDisplayDateTime } from "@myles-garden/utils/date";
import { ParsedIdentifierSchema, QuarterSchema } from "@myles-garden/utils/zod";

toDisplayDateTime(new Date("2023-10-05T14:30:00Z")); // "5 Oct, 2023 at 10:30 AM"

const { year, quarter, startsAt, endsAt } = QuarterSchema.parse("2025-Q2");
const { series, item, part } = ParsedIdentifierSchema.parse("MB-100-1");
```

## What's inside

### Text

| Function                                             | Example                                                           |
| ---------------------------------------------------- | ----------------------------------------------------------------- |
| `pluralize(count, singular, { plural })`             | `pluralize(2, "mouse", { plural: "mice" })` → `"mice"`            |
| `toDisplayList(items, style, { locale })`            | `toDisplayList(["a", "b"], ListStyle.Or)` → `"a or b"`            |
| `toDisplayAndList(items)` / `toDisplayOrList(items)` | `toDisplayAndList(["a", "b", "c"])` → `"a, b, and c"`             |
| `toApaStyleTitleCase(title, { minorWords })`         | `"state-of-the-art technology"` → `"State-of-the-Art Technology"` |
| `toDisplayUrl(url, { maxPathChars })`                | `"https://www.example.com/path/"` → `"example.com/path"`          |
| `toDisplayIsbn(isbn)`                                | `"9780306406157"` → `"978-0-306-40615-7"`                         |
| `toDisplayCoordinates(latitude, longitude)`          | `(43.7, -79.42)` → `"43.70° N, 79.42° W"`                         |
| `toClockEmoji(date)`                                 | 13:45 → `"🕐"`                                                    |
| `toCanonicalUrl(url)`                                | `"https://example.com/a/"` → `"https://example.com/a"`            |
| `trimTrailingSlash(pathname)`                        | `"/a/b/"` → `"/a/b"`; the root `"/"` is kept                      |
| `toJsonLdString(value)`                              | `JSON.stringify` that's safe inside a JSON-LD `<script>` tag      |
| `toSortKey(title)`                                   | `"The Great Gatsby"` → `"great gatsby"`                           |
| `compareBySortKey(a, b)`                             | Comparator that sorts titles by `toSortKey`                       |

`toDisplayIsbn` hyphenates using the International ISBN Agency's range rules, which are bundled with the package. `toSortKey` drops one leading article ("the", "a", "an") and keeps accented letters, and `compareBySortKey` always compares in English, so sort order is the same on every machine.

### Dates

Functions that read a date in a time zone accept `{ timeZone }`, which defaults to `America/Toronto`.

| Function                                       | Example                                                                              |
| ---------------------------------------------- | ------------------------------------------------------------------------------------ |
| `localizeDate(date, { timeZone })`             | Returns a [`TZDate`](https://github.com/date-fns/tz) for date-fns maths in that zone |
| `toDisplayDate(date, { style, timeZone })`     | `"5 Oct, 2023"`, or `"Thursday 5th October, 2023"` with `DateStyle.Long`             |
| `toDisplayTime(date, { timeZone })`            | `"10:30 AM"`                                                                         |
| `toDisplayDateTime(date, { style, timeZone })` | `"5 Oct, 2023 at 10:30 AM"`                                                          |
| `toDisplayDuration(startDate, endDate)`        | `"2 years 3 months"`, or `"Less than a month"`                                       |
| `toDisplayAge(birthDate, { now, timeZone })`   | `"33 years, 39 weeks, 4 days, 15 hours, and 30 minutes"`                             |
| `toIsoDate(date, { timeZone })`                | `"2023-10-05"`, the calendar date in that zone                                       |
| `toIsoDuration(duration)`                      | `{ hours: 1, minutes: 30 }` → `"PT1H30M"`                                            |
| `toOffsetIsoString(date, { timeZone })`        | `"2023-10-05T10:30:00-04:00"`                                                        |
| `toIcsDateArray(date)`                         | `[2023, 10, 5, 14, 30]`, the UTC array the `ics` package expects                     |
| `getQuarterRange(year, quarter, { timeZone })` | `[startsAt, endsAt]` of a quarter                                                    |
| `getYearsAndMonthsInRange(start, end)`         | `[{ year: 2025, months: [...] }]`, for archive navigation                            |
| `startOfCalendarMonth(date)`                   | The Monday on or before `date`                                                       |
| `endOfCalendarMonth(date)`                     | The Sunday on or after `date`                                                        |

### Arrays

| Function                                        | Description                                                                 |
| ----------------------------------------------- | --------------------------------------------------------------------------- |
| `balanceColumns(items, columnCount, getWeight)` | Splits items into columns of roughly equal weight, e.g. for masonry layouts |
| `randomChoice(choices)`                         | Picks a random item and throws if the array is empty                        |

### Identifiers

Registry identifiers take the form `SERIES-ITEM` or `SERIES-ITEM-PART`, e.g. `MB-100`, `MB-100-1`, or `TREX-1`. The series is uppercase letters; the item and part are numbers.

| Function                                  | Example                                                          |
| ----------------------------------------- | ---------------------------------------------------------------- |
| `parseIdentifier(value)`                  | `"MB-100-1"` → `{ series: "MB", item: 100, part: 1 }`            |
| `formatIdentifier(parts)`                 | `{ series: "ARC", item: 5 }` → `"ARC-5"`                         |
| `compareIdentifiers(a, b)`                | Comparator: series alphabetically, then item, then part          |
| `createIdentifierComparator(seriesOrder)` | Comparator that puts the listed series first, in the given order |
| `isNestedUnder(child, parent)`            | `isNestedUnder("MB-404-14", "MB-404")` → `true`                  |

`parseIdentifier` returns `undefined` for anything that isn't an identifier, and the comparators sort those last. An item sorts before its parts, so `MB-100` comes before `MB-100-0`. Nesting is one level deep and stays within a series: a part has no children, and `MB-404` never claims `TREX-404-14`.

### Regex

| Export                              | Matches                                                         |
| ----------------------------------- | --------------------------------------------------------------- |
| `IDENTIFIER_REGEX` / `isIdentifier` | A registry identifier, with `series`, `item`, and `part` groups |
| `ISBN_10_REGEX` / `isIsbn10`        | A normalised ISBN-10, e.g. `"030640615X"`                       |
| `ISBN_13_REGEX` / `isIsbn13`        | A normalised ISBN-13, e.g. `"9780306406157"`                    |

The ISBN patterns expect no hyphens or spaces, and an uppercase `X` check digit.

### zod schemas

The date schemas parse a string in `America/Toronto`.

| Schema                   | Input                                 | Output                                       |
| ------------------------ | ------------------------------------- | -------------------------------------------- |
| `PartialDateSchema`      | `"2025"`, `"2025-06"`, `"2025-06-15"` | The start of that period as a `Date`         |
| `MonthDaySchema`         | `"06-15"`                             | That day in the current year                 |
| `QuarterSchema`          | `"2025-Q1"`                           | `{ value, year, quarter, startsAt, endsAt }` |
| `IdentifierSchema`       | `"MB-100-1"`                          | The identifier, unchanged                    |
| `ParsedIdentifierSchema` | `"MB-100-1"`                          | `{ value, series, item, part }`              |

Use `IdentifierSchema` to validate an identifier you'll store as a string, and `ParsedIdentifierSchema` when you need its parts.

## Exports

| Entry point                      | File                      | Contents                                                     |
| -------------------------------- | ------------------------- | ------------------------------------------------------------ |
| `@myles-garden/utils`            | `src/index.ts`            | Text, array, identifier, and regex helpers                   |
| `@myles-garden/utils/array`      | `src/array/index.ts`      | Array helpers only                                           |
| `@myles-garden/utils/date`       | `src/date/index.ts`       | Date helpers; needs `date-fns` and `@date-fns/tz`            |
| `@myles-garden/utils/identifier` | `src/identifier/index.ts` | Identifier helpers only                                      |
| `@myles-garden/utils/regex`      | `src/regex/index.ts`      | Regex patterns and their predicates only                     |
| `@myles-garden/utils/text`       | `src/text/index.ts`       | Text helpers only                                            |
| `@myles-garden/utils/zod`        | `src/zod/index.ts`        | The zod schemas; needs `zod`, `date-fns`, and `@date-fns/tz` |

## Development

The package is built with [Vite+](https://viteplus.dev). Its `vp` CLI handles formatting, linting, type checking, tests, and bundling:

```sh
vp install  # install dependencies
vp check    # format, lint, and type check
vp test     # run the tests
vp pack     # build to dist/
```

The ISBN range rules come from the International ISBN Agency. To refresh them:

```sh
npm run isbn-ranges:update
```

## License

[MIT](./LICENSE) © [myles braithwaite](https://myles.garden)
