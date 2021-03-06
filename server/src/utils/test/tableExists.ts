import { PUBLIC } from "#utils/const/database/schemaNames";
import { TableExists } from "#utils/sql/SchemaSqlGenerator";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";

async function tableExists (
    tableName: string,
    schemaName = PUBLIC
): Promise<unknown> {
    const result = await generateSqlAndQuery(
        new TableExists(schemaName),
        tableName
    );

    return result[0];
}

export default tableExists;
