export class Space {
    constructor(
        public id: number,
        public slug: string,
        public title: string,
        public postCount: number,
        public description?: string,
        public isOfficial = false,
    ) {}
}
