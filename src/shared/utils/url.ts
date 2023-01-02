import { url } from "@/shared/const";

const URL_DELIMITER = "/";

// Assuming that apiPath looks like "/api/v1/posts/my-post" where "posts" is the
// resource we need (which occupies a known URL segment).
export const getResource = (apiPath: string) => apiPath.split(URL_DELIMITER)
    .filter(Boolean)[url.RESOURCE_SEGMENT_INDEX];
