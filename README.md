# Geek Regime

This monorepo consists of multiple modules (it's very cumbersome to manage multiple associated repositories on GitHub since it doesn't provide an appropriate space for them like BitBucket does, as yet).

For developing, it's recommended to open a module as a separate project in IDE.

## Run the project with Docker in dev mode
Inside `launcher` directory, perform:
1. Add `.env` file with required variables (use `.env.example` as an example).
2. Run `npm run api-commons:build`. It builds `api-commons` which provides shared tools for JVM based modules (like `api-users`).

   If `api-commons` source has been updated, after building it, update the registry as well:
   1) Push the new image to Docker Hub: `docker push eggziom/geek-regime-api-commons:0.0.1-SNAPSHOT`. 
   2) Delete the images of JVM based modules that depend on `api-commons` (like `api-users`, again) to make sure they pull the updated `api-commons` in the next step.

3. Run `npm run dev:up`. It builds and runs the rest modules.

## Run a JVM based module locally
1. Install `api-commons` using Maven, so that it's globally available.
2. Initialize required environmental variables (say, by adding `.env` file to the root).
3. Perform `npm run local:up` in `launcher`. It will spin up databases.
   * This step is not required for `api-aggregator` since it doesn't connect to DB.
4. Run/debug the app in IDE with `dev` profile.
