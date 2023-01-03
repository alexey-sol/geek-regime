# Geek Regime

For developing, it's recommended to open a module as a separate project in IDE.

## Run the project in dev mode
Inside `launcher` directory, perform:
1. Run `npm run api-commons:build`. It builds `api-commons` which provides shared tools for JVM based modules (like `api-users`);
2. Run `npm run dev:up`. It builds the rest modules.

## Run a JVM based module locally
1) Install `api-commons` using Maven, so that it's globally available.
2) Add required environmental variables (say, by adding `.env` file to the root).
3) Perform `npm run local:up` in `launcher`. It will spin up databases.
   * This step is not required for `api-aggregator` since it doesn't connect to DB.
4) Run/debug the app in IDE with `dev` profile.
