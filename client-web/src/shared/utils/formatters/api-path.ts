export const getApiPath = (
    version: number,
    path?: string,
): string => {
    const basePath = `/api/v${version}`;

    return path
        ? `${basePath}/${path}`
        : `${basePath}`;
};
