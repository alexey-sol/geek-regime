export type Gender = "FEMALE" | "MALE";

export type UserDetails = {
    name?: string;
    image: null;
    gender?: Gender;
}

export type User = {
    createdAt: string;
    details?: UserDetails;
    email: string;
    id: number;
    updatedAt: string;
}
