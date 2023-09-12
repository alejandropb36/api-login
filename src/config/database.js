import { Sequelize } from "sequelize";

const database = process.env.DB_DATABASE;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const dialect = process.env.DB_DIALECT;

export const sequelize = new Sequelize(database, user, password, {
    host,
    dialect
});
