import type { OperatorFunction } from "rxjs";
import type { AxiosResponse } from "axios";

export type ResponseDataGetter = <Data>() => OperatorFunction<AxiosResponse, Data>;
