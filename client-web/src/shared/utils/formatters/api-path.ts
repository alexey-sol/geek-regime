export const getApiPath = (
    prefix: string,
    version: number,
    path?: string,
): string => {
    const basePath = `/${prefix}/v${version}`;

    return path
        ? `${basePath}/${path}`
        : `${basePath}`;
};
