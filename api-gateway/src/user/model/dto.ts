import type { components as user } from "@eggziom/geek-regime-js-commons/dist/models/user-schemas-v1";

export type AuthenticateRequest = user["schemas"]["AuthenticateRequest"];

export type ConfirmEmailRequest = user["schemas"]["ConfirmEmailRequest"];

export type CreateEmailConfirmationRequest = user["schemas"]["CreateEmailConfirmationRequest"];

export type CreateUserRequest = user["schemas"]["CreateUserRequest"];

export type EmailConfirmationResponse = user["schemas"]["EmailConfirmationResponse"];

export type HasDisableEmailConfirmation = user["schemas"]["HasDisableEmailConfirmation"];

export type UserResponse = user["schemas"]["UserResponse"];

export type Gender = user["schemas"]["Gender"];
