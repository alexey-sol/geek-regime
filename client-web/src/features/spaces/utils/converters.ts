import { plainToClass } from "class-transformer";

import { Space } from "@/features/spaces/models/entities";
import { type SpaceResponse } from "@/features/spaces/models/dtos";

export const toSpace = (response: SpaceResponse): Space =>
    plainToClass(Space, response);

export const toSpaceList = (list: SpaceResponse[]): Space[] =>
    list.map((response) => toSpace(response));
