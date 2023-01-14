import { UserDetails } from "@/features/users/models/entities";

export type SignInArg = {
    email: string;
    password: string;
};

export type UseAuthResult = {
    profile?: UserDetails;
    signIn: (arg: SignInArg) => void;
};
