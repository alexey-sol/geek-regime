import { UNPROCESSABLE_ENTITY } from "http-status";

import {
    countRecords,
    createRecord,
    destroyAllRecords,
    findAllRecords,
    findOneRecord,
    updateRecordAttributes
} from "#utils/sql/Model";

import {
    CreateFullUsersView,
    CreateHashOptionsTable,
    CreateProfilesTable,
    CreateUsersTable
} from "#utils/sql/SchemaSqlGenerator";

import { FULL_USERS_VIEW } from "#utils/const/database/viewNames";
import { INVALID_PROPS } from "#utils/const/validationErrors";
import { USERS } from "#utils/const/database/tableNames";
import Attributes from "#types/user/Attributes";
import DataOnCreate from "#types/user/DataOnCreate";
import DataOnUpdate from "#types/user/DataOnUpdate";
import DbQueryFilter from "#types/DbQueryFilter";
import Include from "#types/Include";
import Item from "#types/user/Item";
import Model from "#types/Model";
import UserError from "#utils/errors/UserError";
import UserHashOptions from "#types/UserHashOptions";
import UserProfile from "#types/UserProfile";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";
import isUserItem from "#utils/typeGuards/isUserItem";
import separateIncludedAttributes from "#utils/helpers/separateIncludedAttributes";

const returningValues = [
    "id", "email", "isAdmin", "isConfirmed", "createdAt", "updatedAt", "hasPassword"
];

class User implements Model<DataOnUpdate, User> {
    static tableName = USERS;

    about: string;
    createdAt: Date;
    email: string;
    hasPassword: boolean;
    hashOptions?: UserHashOptions;
    id: number;
    isAdmin: boolean;
    isConfirmed: boolean;
    profile?: UserProfile;
    updatedAt: Date;

    private constructor (props: Item) {
        this.about = props.about;
        this.createdAt = props.createdAt;
        this.email = props.email;
        this.hasPassword = props.hasPassword;
        this.id = props.id;
        this.isAdmin = props.isAdmin;
        this.isConfirmed = props.isConfirmed;
        this.updatedAt = props.updatedAt;

        if (props.hashOptions) {
            this.hashOptions = props.hashOptions;
        }

        if (props.profile) {
            this.profile = props.profile;
        }
    }

    static async up (): Promise<void> {
        await generateSqlAndQuery(new CreateUsersTable());
        await generateSqlAndQuery(new CreateProfilesTable());
        await generateSqlAndQuery(new CreateHashOptionsTable());
        await generateSqlAndQuery(new CreateFullUsersView());
    }

    static async create (
        props: DataOnCreate,
        include?: Include[]
    ): Promise<User> | never {
        const record = await createRecord<DataOnCreate, Item>(
            FULL_USERS_VIEW,
            props,
            returningValues
        );

        return (include)
            ? User.findById(record.id, include) as Promise<User>
            : User.formatPropsAndInstantiate(record);
    }

    static async destroyAll (
        filter: DbQueryFilter<Attributes>
    ): Promise<number | null> | never {
        if (!filter.where) {
            return null;
        }

        return destroyAllRecords<Attributes, Item>(USERS, filter);
    }

    static async destroyById (
        id: number
    ): Promise<number | null> | never {
        const where = { id };
        return User.destroyAll({ where });
    }

    static async count (
        filter?: DbQueryFilter<Attributes>
    ): Promise<number> | never {
        return countRecords<Attributes>(USERS, filter);
    }

    static async findAll (
        filter?: DbQueryFilter<Attributes>
    ): Promise<User[]> | never {
        const records = await findAllRecords<Attributes, Item>(
            FULL_USERS_VIEW,
            filter,
            returningValues
        );

        return records.map(record => User.formatPropsAndInstantiate(
            record,
            filter?.include
        ));
    }

    static async findOne (
        filter: DbQueryFilter<Attributes>
    ): Promise<User | null> | never {
        if (!filter.where) {
            return null;
        }

        const record = await findOneRecord<Attributes, Item>(
            FULL_USERS_VIEW,
            filter,
            returningValues
        );

        return (record)
            ? User.formatPropsAndInstantiate(record, filter?.include)
            : null;
    }

    static async findById (
        id: number,
        include?: Include[]
    ): Promise<User | null> | never {
        const where = { id };
        return User.findOne({ include, where });
    }

    async updateAttributes (
        props: DataOnUpdate,
        include?: Include[]
    ): Promise<User> | never {
        const updatedProps = {
            ...props,
            updatedAt: new Date()
        };

        const record = await updateRecordAttributes<DataOnUpdate, Item>(
            FULL_USERS_VIEW,
            this.id,
            updatedProps,
            returningValues
        );

        return (include)
            ? User.findById(this.id, include) as Promise<User>
            : User.formatPropsAndInstantiate(record || this);
    }

    static formatPropsAndInstantiate (
        props: Attributes,
        include?: Include[]
    ): User | never {
        const item = (include)
            ? separateIncludedAttributes(props, include)
            : props;

        if (!isUserItem(item)) {
            throw new UserError(INVALID_PROPS, UNPROCESSABLE_ENTITY);
        }

        return new User(item);
    }
}

export default User;
