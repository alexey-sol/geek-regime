import { plainToClass } from "class-transformer";
import type { UserDto } from "@eggziom/geek-regime-js-commons";

import { User } from "@/features/users/models/entities";

export const fromUserDtoToEntity = (dto: UserDto): User =>
    plainToClass(User, dto);
