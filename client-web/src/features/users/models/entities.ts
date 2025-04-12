import { Type } from "class-transformer";

import { formatTimestamp } from "@/shared/utils/formatters/date";

import { type Gender } from "./dtos";

export class UserDetails {
    constructor(
        public createdAt: string,
        public updatedAt: string,
        public name: string,
        public description?: string,
        public about?: string,
        public gender?: Gender,
        public birthDate?: string,
        public image?: string,
    ) {}

    get formattedBirthDate(): string {
        return this.birthDate ? formatTimestamp(this.birthDate) : "";
    }
}

export class User {
    @Type(() => UserDetails)
    public details: UserDetails;

    constructor(
        public id: number,
        public createdAt: string,
        public updatedAt: string,
        public lastSeenAt: string,
        public email: string,
        public slug: string,
        details: UserDetails,
    ) {
        this.details = details;
    }

    get formattedCreatedAt(): string {
        return formatTimestamp(this.createdAt);
    }

    get formattedUpdatedAt(): string {
        return formatTimestamp(this.updatedAt);
    }

    get formattedLastSeenAt(): string {
        return formatTimestamp(this.lastSeenAt, { timeStyle: "short" });
    }
}
