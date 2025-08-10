# @eggziom/geek-regime-js-utils

The library contains utilities for JS based frontend and backend in the Geek Regime project. NPM: https://www.npmjs.com/package/@eggziom/geek-regime-js-utils.

## Usage

The majority of the stuff gets imported from the root of the package, for example:

```ts
import { isProduction, resources, type HasId } from "@eggziom/geek-regime-js-utils";
```

The models generated from OpenAPI specs, are imported this way:
```ts
import type { components as post } from "@eggziom/geek-regime-js-utils/models/post-schemas-v1";
import type { components as user } from "@eggziom/geek-regime-js-utils/models/user-schemas-v1";
```

The package exports both `CommonJS` and `ES Modules`, so it should work fine in those environments.

## Scripts

### `build`

Build the package and DTO models.

### `test`
### `test:watch`
### `test:coverage`

Unit testing commands.

### `lint`
### `lint:fix`

Linter commands.
