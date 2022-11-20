import type { RootState } from "@/app/store";
import type { User } from "@/features/users/models/entities";

export const getUser = (state: RootState): User | undefined => state.session.user;
