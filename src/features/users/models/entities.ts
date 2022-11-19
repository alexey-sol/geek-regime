import { Type } from "class-transformer";

import { Gender } from "@/features/users/types";

export class UserDetails {
    constructor(
        public createdAt: string,
        public updatedAt: string,
        public name: string,
        public gender?: Gender,
        public image?: string,
    ) {}
}

export class User {
    @Type(() => UserDetails)
    public details: UserDetails;

    constructor(
        public id: number,
        public createdAt: string,
        public updatedAt: string,
        public email: string,
        details: UserDetails,
    ) {
        this.details = details;
    }
}
