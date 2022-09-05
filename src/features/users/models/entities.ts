import { Gender } from "@/features/users/types";

export class User {
    constructor(
        public gender?: Gender,
        public image?: string,
        public name?: string,
    ) {}
}
