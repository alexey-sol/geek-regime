import type { OperatorFunction } from "rxjs";
import type { AxiosResponse } from "axios";

export type ResponseDataGetter = <T>() => OperatorFunction<AxiosResponse, T>;
