import { User } from "@/features/users/models/entities";

export type ActiveUserPending = "get";

export type UseActiveUserResult = {
    pending?: ActiveUserPending;
    user?: User;
};
