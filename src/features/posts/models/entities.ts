import { Type } from "class-transformer";
import { formatTimestamp } from "@/shared/utils/formatters/date";
import { User } from "@/features/users/models/entities";

export class Post {
    @Type(() => User)
    public author: User;

    constructor(
        public body: string,
        public createdAt: string,
        public id: number,
        public slug: string,
        public title: string,
        public updatedAt: string,
        author: User,
    ) {
        this.author = author;
    }

    getFormattedCreatedAt = () => formatTimestamp(this.createdAt);

    getFormattedUpdatedAt = () => formatTimestamp(this.updatedAt);
}
