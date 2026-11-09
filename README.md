# `@myles-garden/utils`

> The shared text, date, array, and identifier helpers for [myles.garden](https://myles.garden)

A small TypeScript package of the formatting and data helpers shared across [myles.garden](https://myles.garden) and its sibling projects: display strings for dates, lists, URLs, and ISBNs; time-zone-aware date maths; sorting; registry identifiers like `MB-100-1`; and a few [zod](https://zod.dev) schemas for partial dates and identifiers.

Every function is framework-free and ships as ESM with type declarations. Date helpers default to `America/Toronto` and the site's date formats, but take a `{ timeZone }` option wherever it matters.

## Requirements

- **An ESM environment.** The package is published as ES modules only.
- **[date-fns](https://date-fns.org) v4** and **[@date-fns/tz](https://github.com/date-fns/tz) v1**, only if you use the [`/date`](https://utils.myles.garden/api/date/readme/) or [`/zod`](https://utils.myles.garden/api/zod/readme/) entry points.
- **[zod](https://zod.dev) v3.25+ or v4**, only if you use the [`/zod` entry point](https://utils.myles.garden/api/zod/readme/).

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

## Documentation

Usage examples and the full API reference are at **[utils.myles.garden](https://utils.myles.garden)**.

The site lives in [`docs/`](./docs), and its API reference is generated from the source's TSDoc comments.

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
