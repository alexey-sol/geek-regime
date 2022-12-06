import path from "path";

import * as constants from "./const";

export const getUseContainerOptions = () => ({
    fallbackOnErrors: true, // [1]
});

const defaultRoot = process.cwd();

export const createServeStaticModuleOptions = (
    apiGatewayPrefix: string,
    root = defaultRoot,
) => [{
    exclude: [`/${apiGatewayPrefix}*`],
    rootPath: path.join(root, "..", constants.PUBLIC_DIR),
    serveRoot: `/${constants.PUBLIC_DIR}`,
}];

// [1]. Allows to inject dependencies into @ValidatorConstraint as described here:
// https://github.com/nestjs/nest/issues/528#issuecomment-395338798
