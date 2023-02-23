import { plainToClass } from "class-transformer";

import { UserDetails } from "@/features/users/models/entities";
import type { UserDetailsDto } from "@/features/users/models/dtos";

export const fromUserDetailsDtoToEntity = (dto: UserDetailsDto): UserDetails =>
    plainToClass(UserDetails, dto);
