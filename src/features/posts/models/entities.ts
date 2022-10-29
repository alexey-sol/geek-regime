import { Expose, Type } from "class-transformer";
import { formatTimestamp } from "@/shared/utils/formatters/date";
import { User } from "@/features/users/models/entities";
import { sanitize } from "dompurify";

export class Post {
    @Type(() => User)
    public author: User;

    constructor(
        public id: number,
        public createdAt: string,
        public updatedAt: string,
        public title: string,
        public body: string,
        public excerpt: string,
        public slug: string,
        author: User,
    ) {
        this.author = author;
    }

    @Expose()
    get formattedCreatedAt() {
        return formatTimestamp(this.createdAt);
    }

    @Expose()
    get formattedUpdatedAt() {
        return formatTimestamp(this.updatedAt);
    }

    @Expose()
    get sanitizedBody() {
        return sanitize(this.body);
    }
}
