import { Profile } from "#types/externalApi/google/oauth/ResponseData";
import { Providers, Types } from "#types/externalApi/common/oauth/meta";
import { ResponseWithMeta } from "#types/externalApi/common/oauth/ResponseData";
import request from "#utils/http/request";

export default async function (
    authToken: string
): Promise<ResponseWithMeta<Profile | null>> {
    const value = await request({
        hostname: "www.googleapis.com",
        method: "GET",
        path: "/oauth2/v3/userinfo",
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    }) as unknown as Profile | null;

    return {
        value,
        provider: Providers.google,
        type: (value)
            ? Types.success
            : Types.failure
    };
}
