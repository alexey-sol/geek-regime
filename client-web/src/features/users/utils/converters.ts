import { plainToClass } from "class-transformer";

import { User } from "@/features/users/models/entities";
import type { UserResponse } from "@/features/users/models/dtos";

export const toUser = (response: UserResponse): User =>
    plainToClass(User, response);

export const toUserList = (list: UserResponse[]): User[] =>
    list.map((response) => toUser(response));
