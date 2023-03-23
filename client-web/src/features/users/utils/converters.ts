import { plainToClass } from "class-transformer";
import type { UserDto } from "js-commons";

import { User } from "@/features/users/models/entities";

export const fromUserDtoToEntity = (dto: UserDto): User =>
    plainToClass(User, dto);
