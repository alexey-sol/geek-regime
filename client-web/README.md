# Client Web

The web frontend of the Geek Regime project.

## Setting up.

### Environment variables:
- API_GATEWAY_HOST - The host of the API. Defaults to `localhost`;
- API_GATEWAY_PORT - The port of the API. Defaults to `3000`;
- API_GATEWAY_PREFIX - The prefix of the API path. Defaults to `api`;
- API_POSTS_RESOURCE - The API path segment referring to Posts resource.
- API_USERS_RESOURCE - The API path segment referring to Users resource.
- APP_NAME - The formal name of the project;
- CLIENT_WEB_HOST - The host of the dev server (development) or the host Nginx is bound to (production). Defaults to `localhost`;
- CLIENT_WEB_PORT - The port of the dev server (development) or the port Nginx is bound to (production). Defaults to `5000`;
- CLIENT_WEB_WEBSOCKET_URL - The websocket URL of dev server, is used in development only. Defaults to `auto://0.0.0.0:0/ws`;
- NODE_ENV - The type of the environment. The valid values are: `development`, `production`, and `test`. Defaults to `production`.
