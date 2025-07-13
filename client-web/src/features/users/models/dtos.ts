import type { components as user } from "@eggziom/geek-regime-js-commons/dist/models/user-schemas-v1";

export type Gender = user["schemas"]["Gender"];

export type UserResponse = user["schemas"]["UserResponse"];

export type CreateUserRequest = user["schemas"]["CreateUserRequest"];

export type AuthenticateRequest = user["schemas"]["AuthenticateRequest"];

export type HasDisableEmailConfirmation = user["schemas"]["HasDisableEmailConfirmation"];

export type UserPageResponse = user["schemas"]["UserPageResponse"];

export type UpdateUserRequest = user["schemas"]["UpdateUserRequest"];

export type CreateEmailConfirmationRequest = user["schemas"]["CreateEmailConfirmationRequest"];
