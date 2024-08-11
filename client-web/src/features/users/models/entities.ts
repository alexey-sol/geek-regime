import { Type } from "class-transformer";
import type { Gender } from "@eggziom/geek-regime-js-commons";

import { formatTimestamp } from "@/shared/utils/formatters/date";

export class UserDetails {
    constructor(
        public createdAt: string,
        public updatedAt: string,
        public name: string,
        public description?: string,
        public about?: string,
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
