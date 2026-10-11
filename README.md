# `@myles-garden/utils`

> The shared text, date, and array helpers for [myles.garden](https://myles.garden)

A small TypeScript package of the formatting and data helpers shared across [myles.garden](https://myles.garden) and its sibling projects: display strings for dates, lists, URLs, and ISBNs; time-zone-aware date maths; sorting; and a few [zod](https://zod.dev) schemas for partial dates.

Every function is framework-free and ships as ESM with type declarations. Date helpers default to `America/Toronto` and the site's date formats, but take a `{ timeZone }` option wherever it matters.

## Requirements

- **An ESM environment.** The package is published as ES modules only.
- **[date-fns](https://date-fns.org) v4** and **[@date-fns/tz](https://github.com/date-fns/tz) v1**, only if you use the [`/date`](#dates) or [`/zod`](#zod-schemas) entry points.
- **[zod](https://zod.dev) v4**, only if you use the [`/zod` entry point](#zod-schemas).

All three are **optional** peer dependencies. The main entry point imports none of them, so the text and array helpers work without them.

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

Import the text and array helpers from the main entry point:

```ts
import { compareBySortKey, toDisplayAndList, toDisplayIsbn } from "@myles-garden/utils";

toDisplayAndList(["tea", "coffee", "juice"]); // "tea, coffee, and juice"
toDisplayIsbn("9780306406157"); // "978-0-306-40615-7"

["The Hobbit", "Dune", "A Wizard of Earthsea"].toSorted(compareBySortKey);
// ["Dune", "The Hobbit", "A Wizard of Earthsea"]
```

The date helpers and schemas live behind their own entry points:

```ts
import { toDisplayDateTime } from "@myles-garden/utils/date";
import { quarterSchema } from "@myles-garden/utils/zod";

toDisplayDateTime(new Date("2023-10-05T14:30:00Z")); // "5 Oct, 2023 at 10:30 AM"

const { year, quarter, startsAt, endsAt } = quarterSchema.parse("2025-Q2");
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

### zod schemas

Each schema parses a string in `America/Toronto`.

| Schema              | Input                                 | Output                                       |
| ------------------- | ------------------------------------- | -------------------------------------------- |
| `partialDateSchema` | `"2025"`, `"2025-06"`, `"2025-06-15"` | The start of that period as a `Date`         |
| `monthDaySchema`    | `"06-15"`                             | That day in the current year                 |
| `quarterSchema`     | `"2025-Q1"`                           | `{ value, year, quarter, startsAt, endsAt }` |

## Exports

| Entry point                 | File                 | Contents                                                     |
| --------------------------- | -------------------- | ------------------------------------------------------------ |
| `@myles-garden/utils`       | `src/index.ts`       | Text and array helpers                                       |
| `@myles-garden/utils/array` | `src/array/index.ts` | Array helpers only                                           |
| `@myles-garden/utils/date`  | `src/date/index.ts`  | Date helpers; needs `date-fns` and `@date-fns/tz`            |
| `@myles-garden/utils/text`  | `src/text/index.ts`  | Text helpers only                                            |
| `@myles-garden/utils/zod`   | `src/zod/index.ts`   | The zod schemas; needs `zod`, `date-fns`, and `@date-fns/tz` |

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
