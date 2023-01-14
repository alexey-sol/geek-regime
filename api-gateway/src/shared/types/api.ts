import type { OperatorFunction } from "rxjs";
import type { AxiosResponse } from "axios";
import { HttpStatus } from "@nestjs/common";

export type ResponseDataGetter = <Data>() => OperatorFunction<AxiosResponse, Data>;
