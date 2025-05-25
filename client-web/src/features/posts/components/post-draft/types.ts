import { type Space } from "@/features/spaces/models/entities";

export type SpaceToPersist = Pick<Space, "isOfficial" | "title">;
