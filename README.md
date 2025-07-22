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

The databases will be pre-populated with generated data (see what `seed-fake-data` profile does below).

## Run a JVM based module locally
1. Install `api-commons` using Maven, so that it's globally available.
2. Initialize required environmental variables (say, by adding `.env` file to the root).
3. Perform `npm run local:up` in `launcher`. It will spin up databases.
   * This step is not required for `api-aggregator` since it doesn't connect to DB.
4. Run/debug the app in IDE with `dev` profile.

## Deploy the project to a remote stand via GitHub Actions
1. Create a new branch and a new environment (under "Environments" in the repository settings) with the same name in the repository. The names must match since the deployment job gets the relevant environment by the branch name.
2. Add this branch to `on.push.branches` list in `.github/workflows/cd.yml`. 
3. Add environment variables as environment secrets (consult the `launcher/.env.example` file).
4. Add these repository secrets (Security / Secrets and variables / Actions in the repository settings).

   - `CLONE_REPOSITORY_SSH_URL` - the argument for `git clone` to download the project from the stand. Example: `git@github.com:alexey-sol/geek-regime.git`;
   - `DEPLOY_SERVER_HOST` - the URL/IP of the stand. Example: `82.202.140.249`;
   - `DEPLOY_SERVER_USERNAME` - the system user name on the stand;
   - `DEPLOY_SSH_PRIVATE_KEY` - SSH private key (i.e. the key without `*.pub` extension, starting with `-----BEGIN OPENSSH PRIVATE KEY-----`).

   The secrets with `DEPLOY` prefix are arguments for the SSH client to connect to the stand from the deployment job.

5. Add the stand's SSH public key (the one with `*.pub` extension, starting with the algorithm name like `ssh-rsa`) to the GitHub account settings. Without this, the stand won't be able to clone the repository.
6. On the stand, login to Docker Registry with `docker login -u eggziom` to make it possible to pull the private `api-commons` image when building JVM services.
7. Push a commit to the branch created on the step 1. The workflow should test it and deploy to the stand. 

## Seed a database

In order to seed `api-posts` or `api-users` database, run the application with one of these additional profiles:
- `seed-fake-data` - generates a bunch of fake data;
- `seed-stub-data` - imports stub data from `resources/stub-data.sql`.
