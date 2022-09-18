import { RootState } from "@/app/store";
import { User } from "@/features/users/models/entities";

export const getUser = (state: RootState): User | undefined => state.session.user;
