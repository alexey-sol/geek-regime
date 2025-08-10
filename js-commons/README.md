# @eggziom/geek-regime-js-commons

A monorepo containing libraries for JS based modules in the Geek Regime project:
- [`@eggziom/geek-regime-js-configs`](./packages/configs/README.md)
- [`@eggziom/geek-regime-js-ui-kit`](./packages/ui-kit/README.md)
- [`@eggziom/geek-regime-js-utils`](./packages/utils/README.md)

## Development

Install all the dependencies via `npm install` from the root, and you're good to go.

You should install a dependency that is shared across multiple packages, in the root; a local one - in the dependent package.

The packages are located under `packages` directory. They're meant to be published separately. Don't forget to bump the version before publishing. The root package `@eggziom/geek-regime-js-commons` isn't supposed to be publishable.

## Scripts

### `build`

Build all the packages.

### `lint`
### `lint:fix`

Run linter commands in all the packages.

### `test`

Run unit testing commands in all the packages.
