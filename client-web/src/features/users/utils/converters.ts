import { plainToClass } from "class-transformer";
import type { UserDetailsDto } from "js-commons/src/types/users";

import { UserDetails } from "@/features/users/models/entities";

export const fromUserDetailsDtoToEntity = (dto: UserDetailsDto): UserDetails =>
    plainToClass(UserDetails, dto);
