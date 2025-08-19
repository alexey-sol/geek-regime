# @eggziom/geek-regime-js-commons

A monorepo containing libraries for JS based modules in the Geek Regime project:
- [`@eggziom/geek-regime-js-configs`](./packages/configs/README.md)
- [`@eggziom/geek-regime-js-ui-kit`](./packages/ui-kit/README.md)
- [`@eggziom/geek-regime-js-utils`](./packages/utils/README.md)

## Development

Install all the dependencies via `npm install` from the root, and you're good to go.

You should install a dependency that is shared across multiple packages, in the root; a local one - in the dependent package.

The packages are located under `packages` directory. They're meant to be published separately. Don't forget to bump the version before publishing. The root package `@eggziom/geek-regime-js-commons` isn't publishable.

Keep in mind that the order of packages under `packages` directory is important:

```json
[
    "packages/configs",
    "packages/utils",
    "packages/ui-kit"
]
```

They must be listed in the order they are dependent on each other. For example, `ui-kit` is dependent on both `configs` and `utils`. The list ensures that the packages get built in the right order so everything works locally.

Here are some quirks of native NPM Workspaces which are generally useful but may turn out to be a pain in the rear sometimes.
- Don t rely on the direct paths to the `node_modules` like `./node_modules/@eggziom/geek-regime-js-configs`. If there's more than 1 package that uses the same dependency of the same version, that dependency gets hoisted to the root `node modules`, so the direct path breaks. As of 08.2025, it seems that there's no reliable way to keep a dependency locally in this case.
- If you install a workspace package in another workspace package, NPM doesn't install it from the registry but creates a symbolic link to the local one. So make sure that the needed packages is build. If you need to install it from the registry, it seems that the only reliable way would be putting that package outside `workspaces` directory.

## Scripts

### `build`

Build all the packages.

### `lint`
### `lint:fix`

Run linter commands in all the packages.

### `test`

Run unit testing commands in all the packages.

### `prettier`

Run prettier in all the packages to format code.
