# @eggziom/geek-regime-js-configs

The library contains configurations for JS based frontend and backend in the Geek Regime project. NPM: https://www.npmjs.com/package/@eggziom/geek-regime-js-configs.

## Usage

To extend a `tsconfig.json` in the application:
- `@eggziom/geek-regime-js-configs/tsconfig/tsconfig.base.json`;
- `@eggziom/geek-regime-js-configs/tsconfig/tsconfig.react.json`.

`eslint` config is needed to be extended directly from `node_modules`:
- `./node_modules/@eggziom/geek-regime-js-configs/dist/cjs/eslint/eslint.base`;
- `./node_modules/@eggziom/geek-regime-js-configs/dist/cjs/eslint/eslint.react`.

Other examples:

```ts
import { baseJestConfig } from "@eggziom/geek-regime-js-configs/jest";
import { baseStorybookConfig } from "@eggziom/geek-regime-js-configs/storybook";
import { libraryViteConfig } from "@eggziom/geek-regime-js-configs/vite";
import { baseWebpackConfig } from "@eggziom/geek-regime-js-configs/webpack";
```

The package exports both `CommonJS` and `ES Modules`, so it should work fine in those environments.

## Scripts

### `build`

Build the package.

### `lint`
### `lint:fix`

Linter commands.
