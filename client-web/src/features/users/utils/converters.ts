import { plainToClass } from "class-transformer";

import type { UserDetailsDto } from "@/features/users/models/dtos";
import { UserDetails } from "@/features/users/models/entities";

export const fromUserDetailsDtoToEntity = (dto: UserDetailsDto): UserDetails =>
    plainToClass(UserDetails, dto);
