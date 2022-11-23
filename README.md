[![NPM Version](https://img.shields.io/npm/v/generate-it-typegen-spec2ts.svg?style=flat-square)](https://www.npmjs.com/package/generate-it-typegen-spec2ts)
[![Build Status](https://github.com/zewish/generate-it-typegen-spec2ts/workflows/build/badge.svg)](https://github.com/zewish/generate-it-typegen-spec2ts/actions?query=workflow%3Abuild)
[![Coverage Status](https://coveralls.io/repos/github/zewish/generate-it-typegen-spec2ts/badge.svg?branch=master)](https://coveralls.io/github/zewish/generate-it-typegen-spec2ts?branch=master)
[![NPM Downloads](https://img.shields.io/npm/dm/generate-it-typegen-spec2ts.svg?style=flat-square)](https://www.npmjs.com/package/generate-it-typegen-spec2ts)

# Generate-It TypeGen Spec2TS

A schema to TypeScript generator plugin for [generate-it](https://github.com/acr-lfr/generate-it) acting as a thin wrapper around the [@spec2ts/jsonschema](https://github.com/touchifyapp/spec2ts/tree/master/packages/jsonschema) type generator.

## Motivation

Since version 5.42.0 generate-it supports using external schema to type generation plugins which effectively overrides the default integrated type generator (quicktype).

The @spec2ts/jsonschema package is clean-slate TypeScript-only solution which generates better types than the current solution used internally in generate-it. Compared to the default type generator this typegen has the following improvements:
- generates proper date types (quicktype only generates `string` for the "type: date-time" fields at the time of writing);
- always creates unions instead of the non-interchangeable enum types (quicktype generates `enums` by default, has an optional flag for `unions`);
- supports and generates proper `nullable` properties (quicktype does not respect the `nullable` parameter at the time of writing);

## Usage

In your generate-it managed project do the following:

```sh
npm install --save-dev generate-it-typegen-spec2ts
```

Afterwards make sure you modify your `.nodegenrc` file to look like this:

```jsonc
{
  // ...
  // required:
  "typegen": "generate-it-typegen-spec2ts",
  // optionally override default typegen options (defaults are given here for reference):
  "typegenOptions": {
    "avoidAny": false,
    "enableDate": true
  }
}
```

Finally make sure to regenerate your project.

**NOTE: In case this is an existing project you may need to do some fixes on your exsiting types in the project.**
