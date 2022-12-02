import type { RootState } from "@/app/store";
import type { User } from "@/features/users/models/entities";

export const selectUser = (state: RootState): User | undefined => state.session.user;
