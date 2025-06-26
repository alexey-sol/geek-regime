import { plainToClass } from "class-transformer";

import { Space } from "@/features/spaces/models/entities";
import { type SaveSpaceRequest, type SpaceResponse } from "@/features/spaces/models/dtos";

export const toSpace = (response: SpaceResponse): Space =>
    plainToClass(Space, response);

export const toSpaceList = (list: SpaceResponse[]): Space[] =>
    list.map((response) => toSpace(response));

export const toSaveSpaceRequest = (source: Partial<Space>): SaveSpaceRequest => ({
    description: source.description,
    title: source.title ?? "",
});

export const toSaveSpaceRequestList = (list: Partial<Space>[]): SaveSpaceRequest[] =>
    list.map((source) => toSaveSpaceRequest(source));
