import type { Request } from "@nestjs/common";

import type { HasId } from "@/shared/types/props";

export type AuthRequest = Request & {
    user: HasId;
};
