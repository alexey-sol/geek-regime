import { PROFILES, USERS } from "#utils/const/database/tableNames";
import { PUBLIC } from "#utils/const/database/schemaNames";
import SchemaSqlGenerator from "./SchemaSqlGenerator";

class CreateProfilesTable extends SchemaSqlGenerator<unknown> {
    constructor () {
        super(PUBLIC);
    }

    protected getText (): string {
        return `
            CREATE TABLE IF NOT EXISTS "${PROFILES}" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(255) NOT NULL,
                "picture" BYTEA,
                "birthdate" TIMESTAMP,
                "about" TEXT DEFAULT '',
                "totalVoteCount" INTEGER DEFAULT 0,
                "lastActivityDate" TIMESTAMP DEFAULT NOW() NOT NULL,
                "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
                "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
                "userId" INTEGER UNIQUE NOT NULL
                    REFERENCES "${USERS}" ("id")
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
            );

            CREATE INDEX IF NOT EXISTS idx_profiles_name ON "${PROFILES}"
                USING gin ("name" gin_trgm_ops);
            CREATE INDEX IF NOT EXISTS idx_profiles_about ON "${PROFILES}"
                USING gin ("about" gin_trgm_ops);

            CREATE INDEX IF NOT EXISTS idx_profiles_last_act ON "${PROFILES}" ("lastActivityDate");
            CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON "${PROFILES}" ("userId");
        `;
    }
}

export default CreateProfilesTable;
