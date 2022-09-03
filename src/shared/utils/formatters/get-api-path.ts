export const getApiPath = (
    prefix: string,
    version: number,
    resource: string,
): string => `/${prefix}/v${version}/${resource}`;
